/*        data-model.js: define how data is structured and managed        */
/*        This is the only file that requires the Database object         */

var db = require('../database/db');

/*  var schema is used for convenience to get column names in updateRow() */
/*
var schema = {
  "items": [
    "id", "name", "unit", "price", "qty", "desc"],
  "announce": [
    "id", "title", "date", "body"],
  "events": [
    "id", "title", "date", "body"],
  "motd": [
    "id", "title", "body"]
}
*/


var schema = {
  "test50": [
    "id", "nom", "adresse", "acces", "tel", "mail", "fax", "description", "public_cible", "age_min",
    "age_max", "sexe", "sans_enfants", "droit_sejour", "precarite", "prostitution", "addiction",
    "psy", "soutien_pro", "interpretariat", "horaires", "medG", "droitsMedG", "sans_rdvMedG",
    "sur_rdvMedG", "equipe_mobileMedG", "ConsultSpe1", "droitsConsultSpe1", "sans_rdvConsultSpe1",
    "sur_rdvConsultSpe1", "equipe_mobileConsultSpe1", "ConsultSpe2", "droitsConsultSpe2", "sans_rdvConsultSpe2",
    "sur_rdvConsultSpe2", "equipe_mobileConsultSpe2", "Dentaire", "droitsDentaire", "sans_rdvDentaire",
    "sur_rdvDentaire", "equipe_mobileDentaire", "Soinsinfirmiers", "droitsSoinsinfirmiers", "sans_rdvSoinsinfirmiers",
    "sur_rdvSoinsinfirmiers", "equipe_mobile", "Laboratoire", "droitsLaboratoire", "sans_rdvLaboratoire",
    "sur_rdvLaboratoire", "equipe_mobileLaboratoire", "Depistage", "droitsDepistage", "sans_rdvDepistage",
    "sur_rdvDepistage", "equipe_mobileDepistage", "ImagerieMed", "droitsImagerieMed", "sans_rdvImagerieMed",
    "sur_rdvImagerieMed", "equipe_mobileImagerieMed", "Traitement", "droitsTraitement", "sans_rdvTraitement",
    "sur_rdvTraitement", "equipe_mobileTraitement", "Psychiatrique", "droitsPsychiatrique",
    "sans_rdvPsychiatrique", "sur_rdvPsychiatrique", "equipe_mobilePsychiatrique",
    "Psychologue", "droitsPsychologue", "sans_rdvPsychologue", "sur_rdvPsychologue",
    "equipe_mobilePsychologue", "Soinsinfirmiers2", "droitsSoinsinfirmiers2", "sans_rdvSoinsinfirmiers2",
    "sur_rdvSoinsinfirmiers2", "equipe_mobileSoinsinfirmiers2", "TraitementPsychiatrique",
    "droitsTraitementPsychiatrique", "sans_rdvTraitementPsychiatrique", "sur_rdvTraitementPsychiatrique",
    "equipe_mobileTraitementPsychiatrique", "ConsultationAddictologie", "droitsConsultationAddictologie",
    "sans_rdvConsultationAddictologie", "sur_rdvConsultationAddictologie", "equipe_mobileConsultationAddictologie",
    "delivranceTraitement", "droitsdelivranceTraitement", "sans_rdvdelivranceTraitement",
    "sur_rdvdelivranceTraitement", "equipe_mobiledelivranceTraitement", "Methadone",
    "droitsMethadone", "sans_rdvMethadone", "sur_rdvMethadone", "equipe_mobileMethadone",
    "Subutex", "droitsSubutex", "sans_rdvSubutex", "sur_rdvSubutex", "equipe_mobileSubutex",
    "Psychotropes", "droitsPsychotropes", "sans_rdvPsychotropes", "sur_rdvPsychotropes",
    "equipe_mobilePsychotropes", "Soinsinfirmiers3", "droitsSoinsinfirmiers3",
    "sans_rdvSoinsinfirmiers3", "sur_rdvSoinsinfirmiers3", "equipe_mobileSoinsinfirmiers3",
    "MaterieldeRdR", "droitsMaterieldeRdR", "sans_rdvMaterieldeRdR", "sur_rdvMaterieldeRdR",
    "equipe_mobileMaterieldeRdR", "ConsultSociales", "droitsConsultSociales",
    "sans_rdvConsultSociales", "sur_rdvConsultSociales", "equipe_mobileConsultSociales",
    "SocioEducatif", "droitsSocioEducatif", "sans_rdvSocioEducatif", "sur_rdvSocioEducatif",
    "equipe_mobileSocioEducatif", "Domiciliation", "droitsDomiciliation", "sans_rdvDomiciliation",
    "sur_rdvDomiciliation", "equipe_mobileDomiciliation", "Juridique", "droitsJuridique", "sans_rdvJuridique",
    "sur_rdvJuridique", "equipe_mobileJuridique", "Hebergement", "droitsHebergement", "sans_rdvHebergement",
    "sur_rdvHebergement", "equipe_mobileHebergement", "Repas", "droitsRepas", "sans_rdvRepas",
    "sur_rdvRepas", "equipe_mobileRepas", "Douche", "droitsDouche", "sans_rdvDouche", "sur_rdvDouche",
    "equipe_mobileDouche", "WC", "droitsWC", "sans_rdvWC", "sur_rdvWC", "equipe_mobileWC",
    "Laverie", "droitsLaverie", "sans_rdvLaverie", "sur_rdvLaverie", "equipe_mobileLaverie",
    "Bagagerie", "droitsBagagerie", "sans_rdvBagagerie", "sur_rdvBagagerie", "equipe_mobileBagagerie",
    "Chenil", "droitsChenil", "sans_rdvChenil", "sur_rdvChenil", "equipe_mobileChenil", "Emploi",
    "droitsEmploi", "sans_rdvEmploi", "sur_rdvEmploi", "equipe_mobileEmploi", "ServiceEnPlus1",
    "ServiceEnPlus1Details", "droitsServiceEnPlus1", "sans_rdvServiceEnPlus1", "sur_rdvServiceEnPlus1",
    "equipe_mobileServiceEnPlus1", "ServiceEnPlus2", "ServiceEnPlus2Details", "droitsServiceEnPlus2",
    "sans_rdvServiceEnPlus2", "sur_rdvServiceEnPlus2", "equipe_mobileServiceEnPlus2", "ServiceEnPlus3",
    "ServiceEnPlus3Details", "droitsServiceEnPlus3", "sans_rdvServiceEnPlus3", "sur_rdvServiceEnPlus3",
    "equipe_mobileServiceEnPlus3", "ServiceEnPlus4", "ServiceEnPlus4Details", "droitsServiceEnPlus4",
    "sans_rdvServiceEnPlus4", "sur_rdvServiceEnPlus4", "equipe_mobileServiceEnPlus4"]
}

/* CRUD functions: readTable, createRow, updateRow, deleteRow             */

//mettre condition sur l'id par rapport aux reste
function readTable(table, cb) {
  let sql = `SELECT * FROM ${table} Where id = 7`;
  let data = {};
  db.all(sql, function (err, rows) {        /* Return all results of query */
    if (err) throw (err);            /* If there's an error, terminate app */
    rows.forEach(function (row) {       /* For each row matching the query */
      data[row.id] = {};                  /* init row id as top-level key */
      Object.keys(row).forEach(function (k) {    /* For each column of row */
        data[row.id][k] = unescape(row[k]);     /* add the key-value pair */
      });
    });
    cb(data);    /* data = { id: { "colname" : value }, ... }, id2: ... } */
  });
};

function createRow(table, cb) {
  let sql = `INSERT INTO ${table} DEFAULT VALUES`;
  db.run(sql, cb);
};

function updateRow(table, rb, cb) {
  var pairs = "";           /* for constructing 'identifier = value, ...' */
  for (field of schema[table]) {   /* for every column except id */
    if (pairs) pairs += ", ";    /* insert comma unless string is empty */
    pairs += `${field} = '${escape(rb[field])}'`;   /* column = 'value' */
  }
  let sql = `UPDATE ${table} SET ${pairs} WHERE id = ?`;  /* ? = rb['id'] */
  db.run(sql, rb['id'], cb);
  console.log(sql);
};

function deleteRow(table, id, cb) {
  let sql = `DELETE FROM ${table} WHERE id = ${id};`;
  db.run(sql, cb);
};

module.exports = {
  schema,
  readTable,
  createRow,
  updateRow,
  deleteRow
}