// Returns schema of the indicator to validate against
function getSchemaUrl(indicId_) {
  // Hard coded array of schema urls
  const allSchemaUrl = {
    "ind-001":
      "https://raw.githubusercontent.com/DITP-pilotage/poc-imports/master/schemas/prod-tree/schema-IND-001.json",
    "ind-002":
      "https://raw.githubusercontent.com/DITP-pilotage/poc-imports/master/schemas/prod-tree/schema-IND-002.json",
    "ind-003":
      "https://schema.data.gouv.fr/schemas/NaturalSolutions/schema-arbre/0.3.0/schema.json"
  };

  return allSchemaUrl[indicId_];
}

// Send file to validata API
async function validateFile(file_, schemaUrl_) {
  const validateEndpoint = "https://api.validata.etalab.studio/validate";

  // Check https://api.validata.etalab.studio/apidocs
  // TODO send file to validata API
  let file = document.getElementById("myFile").files[0];

  let data = new FormData();
  data.append("schema", schemaUrl_);
  data.append("file", file);
  return fetch(validateEndpoint, {
    // Your POST endpoint
    method: "POST",
    headers: {
      // Content-Type may need to be completely **omitted**
      // or you may need something
      //"Content-Type": "multipart/form-data"
    },
    body: data // This is your file object
  })
    .then(
      (response) => response.json() // if the response is a JSON object
    )
    .then(
      (success) => {
        console.log("success");
        return success;
      } // Handle the success response object
    )
    .catch(
      (error) => {
        console.log(error);
      } // Handle the error response object
    );
}

async function onValidateData(formData) {
  let res = {
    indicId: formData.indicId.value,
    userComment: formData.userComment.value,
    filename: formData.filename.value,
    fileObject: document.getElementById("myFile").files[0],
    schemaUrl: getSchemaUrl(formData.indicId.value)
  };

  const selectedFile = document.getElementById("myFile").value;

  console.log(selectedFile);

  console.log({ res });

  let isFileValidResponse = await validateFile(res.fileObject, res.schemaUrl);
  console.log(isFileValidResponse);
  let isFileValid = isFileValidResponse.report.valid;

  console.log(isFileValid);
  alert(
    JSON.stringify(
      Object.assign(res, {
        "données valides": isFileValid,
        "Nb erreurs": isFileValidResponse.report.stats.errors
      }),
      null,
      4
    )
  );
  if (isFileValid) {
    // TODO Enable button "Import Data"
    document.getElementById("resultLabel").textContent = "OUI";
  } else document.getElementById("resultLabel").textContent = "NON";
}

function onImportData(formData) {
  alert("ImportData triggered");
}
