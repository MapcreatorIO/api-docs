const https = require('https');
const fs = require('fs');

function downloadDocs () {
  return new Promise((resolve, reject) => {
    const docsUrl = 'https://api.beta.maps4news.com/docs';

    https.get(docsUrl, function (res) {
      let body = '';

      res.on('data', function (chunk) {
        body += chunk;
      });

      res.on('end', function () {
        resolve(JSON.parse(body));
      });
    }).on('error', function (e) {
      reject(e);
    });
  });
}

function getModels (json) {
  const models = [];

  for (const name in json.components.schemas) {
    const model = json.components.schemas[name];

    if (model.hasOwnProperty('xml') && model.xml.hasOwnProperty('name')) {
      models.push(model);
    }
  }

  return models;
}

function generateTables (models) {
  let string = '# Models\n\n';

  for (const name in models) {
    if (!models.hasOwnProperty(name)) continue;

    const model = models[name];

    // Add title
    string += `## ${model.xml.name}\n\n`;

    // Add columns
    string += '| Attribute | Type | Description | Searchable | Sortable |\n';
    string += '|---|---|---|---|---|\n';

    // Add properties
    for (const propertyName in model.properties) {
      if (!model.properties.hasOwnProperty(propertyName)) continue;

      const property = model.properties[propertyName];

      string += `| ${propertyName} | ${property.type} | ${property.description} | ${property['x-searchable'] ? 'Yes' : 'No'} | ${property['x-sortable'] ? 'Yes' : 'No'} |\n`
    }

    string += '\n\n';
  }

  return string.trimRight();
}

function writeFile (content) {
  fs.writeFileSync(`${__dirname}/../source/includes/_models.md`, content);
}

downloadDocs()
  .then(getModels)
  .then(generateTables)
  .then(writeFile);
