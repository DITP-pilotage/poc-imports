

function getConfig() {

  // Hard coded array of schema urls
  const allSchemaUrl = {
    "ind-001":
      "https://raw.githubusercontent.com/DITP-pilotage/poc-imports/master/schemas/prod-tree/schema-IND-001.json",
    "ind-002":
      "https://raw.githubusercontent.com/DITP-pilotage/poc-imports/master/schemas/prod-tree/schema-IND-002.json",
    "ind-003":
      "https://schema.data.gouv.fr/schemas/NaturalSolutions/schema-arbre/0.3.0/schema.json",
    "ind-004": "https://raw.githubusercontent.com/DITP-pilotage/poc-imports/master/schemas/templates/indicateur/restrict-regions/import-regions-va.json",
    "ind-005": "https://raw.githubusercontent.com/DITP-pilotage/poc-imports/master/schemas/templates/indicateur/sans-contraintes/schema_pilote_sans_contraintes.json"
  };


  return {
    allSchemaUrl,
    validateEndpoint: "https://api.validata.etalab.studio/validate",
    idFileElement: "myFile"
  }

}

// Return loaded File
function getLoadedFile() {
  return document.getElementById(getConfig().idFileElement).files[0];
}


// Returns schema of the indicator to validate against
function getSchemaUrl(indicId_) {
  return getConfig().allSchemaUrl[indicId_];
}




// Send file to validata API
async function validateFile(file_, schemaUrl_) {

  let file = getLoadedFile();


  // Build form payload for validata API
  let data = new FormData();
  data.append("schema", schemaUrl_);
  data.append("file", file);

  // POST data = schemaUrl + File
  return fetch(getConfig().validateEndpoint, {
    // Your POST endpoint
    method: "POST",
    body: data
  })
    .then(r => r.json())
    .then(rjson => {
        console.log("success");
        return rjson;
      }
    )
    .catch(error => {
        console.log(error);
      }
    );
}


// When "validate data" button is clicked
async function onValidateData(formData) {

  let res = {
    indicId: formData.indicId.value, // Id de l'indicateur
    userComment: formData.userComment.value, // Commentaire utilisateur
    filename: formData.filename.value, // Chemin du fichier
    fileObject: getLoadedFile(),
    schemaUrl: getSchemaUrl(formData.indicId.value) // Url du schema
  };

  console.log({ res });

  let isFileValidResponse = await validateFile(res.fileObject, res.schemaUrl);
  let isFileValid = isFileValidResponse.report.valid;

  console.log(isFileValid);
  // Display results
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
    document.getElementById("resultLabel").textContent = "OUI";
    // TODO Enable button "Import Data"
  } else {
    document.getElementById("resultLabel").textContent = "NON";
    // TODO Disable button "Import Data"
  }
}

function onImportData(formData) {
  alert("ImportData triggered");
  // TODO Push data to db
}
