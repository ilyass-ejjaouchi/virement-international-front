export const validate = values => {
    const errors = {}
    if (!values.compteDebite) {
        errors.compteDebite = 'vous devez choisir le compte à débiter'
    }if (!values.typeVirement) {
        errors.typeVirement = 'vous devez choisir le type de virement'
    }if (!values.compteCredite) {
        errors.compteCredite = 'vous devez choisir le compte à créditer'
    }if (!values.motif) {
        errors.motif = 'le motif est obligatoire'
    }if (!values.refClient) {
        errors.refClient = 'le reference client est obligatoire'
    }if (!values.montant) {
        errors.montant = 'vous devez saisir le montant';
    }else if(values.montant <= 0){
        errors.montant = 'le montant doit être positif';
    }if (!values.dateExecution){
        errors.dateExecution = 'vous devez saisir la date';
    }if (!values.devise){
        errors.devise = 'vous devez saisir la devise';
    }if (!values.justificatif){
        errors.justificatif = 'vous devez saisir le justificatif';
    }if (!values.modeImputation){
        errors.modeImputation = 'vous devez saisir la mode d\'imputation';
    }/*if (!values.nomComplet){
        errors.nomComplet = 'vous devez saisir le nom complet';
    }if (!values.CIN){
        errors.CIN = 'vous devez saisir le CIN';
    }if (!values.beneficiare){
        errors.beneficiare = 'vous devez saisir le beneficiare';
    }if (!values.nomMedecin){
        errors.nomMedecin = 'vous devez saisir le nom du medcin';
    }if (!values.numinstruction){
        errors.numinstruction = 'vous devez saisir le numero d\'instruction';
    }if (!values.organismeHospitalier){
        errors.organismeHospitalier = 'vous devez saisir l\'organisme hospitalier';
    }if (!values.periodeCouverture){
        errors.periodeCouverture = 'vous devez saisir la periode de couverture';
    }*/
    return errors
}
