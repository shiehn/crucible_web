import React, {useState, useEffect} from 'react';
import {API_URLS} from "./apiUrls.js";
import {store} from "./main.jsx";
import {useStore} from "./main.jsx";
import {toast} from "react-toastify";
import {v4 as uuidv4} from "uuid";
import FileDropComponent from "./FileDropComponent.jsx";
import Slider from 'react-input-slider';
import Switch from 'react-switch';
import {sendRequest} from "./api.js";

function formatSendRequestBody(inputObject) {
  if (typeof inputObject !== 'object' || inputObject === null) {
    throw new Error('Input must be an object');
  }

  const uuid = inputObject.id;
  if (!uuid) {
    throw new Error('ID is missing from the input');
  }

  const data = inputObject.data;
  if (!data) {
    throw new Error('Data is missing from the input');
  }

  const methodName = data.method_name;
  if (!methodName) {
    throw new Error('Method name is missing from the data');
  }

  const paramsArray = data.params;
  if (!Array.isArray(paramsArray)) {
    throw new Error('Params are missing from the data');
  }

  const formData = inputObject.formData;

  const outputParams = inputObject.data.params.reduce((params, param) => {
    if (typeof param !== 'object' || param === null || !param.name || !param.type) {
      return params;
    }

    // Assign value from formData for each param, if available
    const valueFromFormData = formData && formData[param.name] ? formData[param.name].value : undefined;

    const value = valueFromFormData !== undefined ? valueFromFormData
      : param.default_value !== null ? param.default_value
        : param.type === 'int' ? 999
          : param.type === 'str' ? 'super-moon'
            : undefined;

    params[param.name] = {value: value, type: param.type};
    return params;
  }, {});

  return {
    token: uuid,
    request: {
      token: uuid,
      type: 'run_method',
      bpm: store.getState().bpm,
      sample_rate: store.getState().sampleRate,
      data: {
        method_name: methodName,
        params: outputParams
      }
    }
  };
}

function createTestFile() {
  const data = new Blob(["This is a test file content"], {type: 'text/plain'});
  const file = new File([data], "testFile.txt", {type: 'text/plain'});
  return file;
}

async function uploadFileToGCP(file, signedUrl) {
  try {
    const {storage_path} = useStore();
    const response = await fetch(signedUrl, {
      method: 'PUT',      // Signed URL is generated for a PUT request
      body: file,         // The file to be uploaded
      headers: {
        'Content-Type': file.type // Set the Content-Type to the file's mime type
      },
    });

    if (response.ok) {

      // Handle successful upload here
    } else {
      console.error('File upload to GCP Storage failed.', response.status, response.statusText);
      // Handle failed upload here
    }
  } catch (error) {
    console.error('Error during file upload to GCP Storage:', error);
    // Handle error case here
  }
}

async function getSignedUrl(file) {

  const tempFileToUpload = createTestFile();
  const {connection_token, server_ip} = useStore();

  // Fetch the signed URL from your DRF API with the custom token in the header
  const response = await fetch(API_URLS.STORAGE_GET_SIGNED_URL(server_ip,file.name, connection_token), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });


  //todo - check if response is ok
  const data = await response.json();
  const signedUrl = data.signed_url;

  return signedUrl;
}

function ContractDisplay({contract, isVisible}) {

  // contract = {
  //   data: {
  //     author: "Default Author",
  //     description: "Default Description",
  //     method_name: "arbitrary_method",
  //     name: "Default Name",
  //     params: [
  //       {
  //         name: 'parameter1Name',
  //         type: 'int',
  //         default_value: '6',
  //       }
  //     ],
  //   },
  // }

  const {connected, storage_path, server_ip} = useStore();
  // Form data state
  const [formData, setFormData] = useState({});
  const [uploadStatus, setUploadStatus] = useState({});

  //DRAG AND DROP
  const [fileDropInstances, setFileDropInstances] = useState([]);

  // Initialize responses state based on parameters with type === 'ByoacFilePath'
  // Check if contract.data.params is available and is an array before reducing it
  const initialResponses = contract && contract.data && Array.isArray(contract.data.params)
    ? contract.data.params.reduce((responsesObj, param) => {
      if (param.type === 'RunesFilePath') {
        responsesObj[param.name] = {
          id: param.name,
          fileName: '',
          fileURL: '',
          error: '',
        };
      }
      return responsesObj;
    }, {})
    : {};

  const [responses, setResponses] = useState(initialResponses);

  useEffect(() => {
    // Code to execute when ContractDisplay is rendered or isVisible prop changes
    if (isVisible) {
      // toast.info('ContractDisplay is now visible');
    }
  }, [isVisible]);


  const addFileDropInstance = (event) => {
    event.preventDefault();
    const newId = uuidv4();
    setFileDropInstances([...fileDropInstances, newId]);
  };

  const handleSwitchChange = (name, checked) => {
    setFormData(prev => ({
      ...prev,
      [name]: {type: 'bool', value: checked},
    }));
  };

  const handleFileDropResponse = (res) => {
    setResponses({...responses, [res.id]: res});

    setFormData(prevFormData => {
      const newFormData = {
        ...prevFormData,
        [res.id]: {type: 'str', value: res.fileURL}
      };

      return newFormData;
    });

    setFileDropInstances(current => current.filter(id => id !== res.id));
  };

  // Effect to initialize formData when contract changes
  useEffect(() => {
    if (contract?.data?.params) {
      const initialFormData = contract.data.params.reduce((acc, param) => {
        acc[param.name] = {type: param.type, value: param.default_value ?? ''};
        return acc;
      }, {});
      setFormData(initialFormData);
    }
  }, [contract]);

  const submitForm = useStore(state => state.submitForm);

  useEffect(() => {
    if (submitForm) {
      handleSubmit();
    }
  }, [submitForm]);

  // Handle input change for regular inputs
  const handleChange = (name, type, event) => {
    const value = type === 'int' ? parseInt(event.target.value, 10) : event.target.value;
    setFormData(prev => ({
      ...prev,
      [name]: {type: type, value: value},
    }));
  };

  // Handle slider change for RunesNumberSlider
  const handleSliderChange = (name, xValue) => {
    setFormData(prev => ({
      ...prev,
      [name]: {type: 'float', value: xValue},
    }));
  };

  function pathJoin(prefix, suffix) {
    const pre = prefix;
    const suf = suffix;
    const result = `${prefix.replace(/\/+$/, '')}/${suffix.replace(/^\/+/, '')}`;
    return prefix + '/' + suffix
  }

  const createDownloadLink = (fileName) => {
    return pathJoin(storage_path, fileName);
  }

  // Handle file change for file inputs
  const handleFileChange = async (name, event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploadStatus(prev => ({...prev, [name]: 'uploading'}));

    try {
      const signedUrl = await getSignedUrl(file); // Function to get the signed URL
      await uploadFileToGCP(file, signedUrl);

      setFormData(prev => ({
        ...prev,
        [name]: {type: 'str', value: createDownloadLink(file.name)}, // Update formData with file URL
      }));
      setUploadStatus(prev => ({...prev, [name]: 'uploaded'}));
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus(prev => ({...prev, [name]: 'failed'}));
    }
  };

  function validateFormData(formData) {
    let missingFields = [];

    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        const value = formData[key].value;

        if (value === undefined || value === null || value === '') {
          missingFields.push(key);
        }
      }
    }

    if (missingFields.length > 0) {
      toast.warning("Please fill in the following fields: " + missingFields.join(', '));
      return false
    }

    return true
  }

  // Handle form submission
  const handleSubmit = async (event) => {
    if (!connected) {
      toast.error("Not connected!");
      return
    }

    // Ensure formData is collected from the current state and passed correctly
    if (contract && contract.data && contract.data.params && formData) {
      //VALIDATE FORM DATA
      if (!validateFormData(formData)) {
        store.setState({submitForm: false});
        return
      }

      console.log("XXX_CONTRACT", contract)
      console.log("XXX_FORM_DATA", formData)
      const formattedRequestBody = formatSendRequestBody({...contract, formData: formData});

      console.log("XXX_FORMATTED_REQUEST", formattedRequestBody)

      let sendRequestResponse = await sendRequest(server_ip, formattedRequestBody);
      console.log("XXX_SEND_REQUEST_RESPONSE", sendRequestResponse)
      if (sendRequestResponse) {
        store.setState({messageId: sendRequestResponse.id});
      }
      store.setState({submitForm: false});
    } else {
      console.error('Contract data or form data is not available.');
    }
  };

  //MOVE TO API UTILS
  // const sendRequest = async (formattedRequestBody) => {
  //   try {
  //     const url = API_URLS.MESSAGE_SEND(server_ip);
  //     const response = await fetch(url, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(formattedRequestBody)
  //     });
  //
  //     if (!response.ok) {
  //       //TODO - check if response messages
  //       toast.error("MESSAGE already processing!");
  //     }
  //
  //     const responseData = await response.json();
  //     store.setState({messageId: responseData.id});
  //   } catch (error) {
  //     console.error("Error in network request:", error);
  //   }
  // };

  // let responseData = await sendRequest(server_ip, formattedRequestBody);
  // if (responseData) {
  //   store.setState({messageId: responseData.id});
  // }

  if (!contract?.data?.params) {
    return null
  }

  function getTypeDisplayText(type) {
    if (type === "RunesFilePath") {
      return "file";
    } else if (type === "int" || type === "float") {
      return "number";
    } else if (type === "str") {
      return "text";
    }
    return type; // Default case if none of the conditions match
  }

  return (
    <form className="w-full h-full rounded shadow-lg" onSubmit={handleSubmit}>

      <div className="w-full h-[56px] p-2 border-sas-text-grey border-b-2">
        <div className="w-[460px] text-sas-green text-xs font-bold mb-1">
          {contract?.data?.name ? contract.data.name : 'NAME'}
        </div>
        <div className="w-[460px] text-sas-text-grey text-xxs mb-2">
          {contract?.data?.description ? contract.data.description : 'DESCRIPTION'}
        </div>
      </div>

      <div className="flex flex-col w-full p-4">
        {contract.data.params.map(param => (
          <div key={param.name} className="flex flex-col w-full px-3 mb-6 bg-sas-background-light">
            {param.type === 'RunesFilePath' ? (
              // File input logic
              <div className="w-full text-sas-text-grey">
                <span>
                  <span className="text-md uppercase">{param.name}</span>
                  <span className="text-xs"> : {getTypeDisplayText(param.type)}</span>
                </span>
                <FileDropComponent id={param.name} onResponse={handleFileDropResponse}/>
              </div>
            ) : param.ui_component === 'RunesMultiChoice' ? (
              // Select input logic for RunesMultiChoice
              <div className="w-full text-sas-text-grey">
                <span>
                  <span className="text-md uppercase">{param.name}</span>
                  <span className="text-xs"> : {getTypeDisplayText(param.type)}</span>
                </span>
                <select
                  value={formData[param.name]?.value || param.default_value}
                  onChange={(e) => handleChange(param.name, param.type, e)}
                  className="block w-full bg-sas-background-light text-xs text-gray-400 border border-sas-text-grey rounded py-2 px-3 mb-3"
                  id={param.name}
                >
                  {param.options.map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            ) : param.ui_component === 'RunesNumberSlider' ? (
              <div className="w-full">
                <div className="w-full text-sas-text-grey uppercase">
                  {`${param.name}: ${formData[param.name]?.value || param.default_value}`}
                </div>
                <Slider
                  styles={{
                    track: {width: '100%', backgroundColor: 'rgb(139 158 176)'},
                    active: {backgroundColor: '#52af77'},
                    thumb: {width: 30, height: 30, backgroundColor: '#52af77'}
                  }}
                  axis="x"
                  xstep={param.step}
                  xmin={param.min}
                  xmax={param.max}
                  x={formData[param.name]?.value || param.default_value}
                  onChange={({x}) => handleSliderChange(param.name, x)}
                />
              </div>
            ) : param.type === 'bool' ? (
              <div className="w-full text-sas-text-grey">
                <div className="w-full text-sas-text-grey uppercase">
                  {`${param.name}: ${formData[param.name]?.value || param.default_value}`}
                </div>
                <Switch
                  onChange={(checked) => handleSwitchChange(param.name, checked)}
                  checked={formData[param.name]?.value || false}
                  width={112}
                  onColor="#3aa675"
                  offColor="#8b9eb0"

                />
              </div>
            ) : (
              // Other input types logic
              <div className="w-full text-sas-text-grey">
                <span>
                  <span className="text-md uppercase">{param.name}</span>
                  <span className="text-xs"> : {getTypeDisplayText(param.type)}</span>
                </span>
                <input
                  type={param.type === 'int' ? 'number' : 'text'}
                  value={formData[param.name]?.value || ''}
                  onChange={(e) => handleChange(param.name, param.type, e)}
                  onFocus={(e) => {
                    if (e.target.value === param.default_value) {
                      handleChange(param.name, param.type, {target: {value: ''}});
                    }
                  }}
                  className="block w-full bg-sas-background-light text-xs text-gray-400 border border-sas-text-grey rounded py-2 px-3 mb-3"
                  id={param.name}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </form>
  );

}

export default ContractDisplay;