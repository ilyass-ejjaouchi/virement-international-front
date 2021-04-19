import IBAN from "iban";

export const validate = values => {
    const errors = {}
    if (!values.IBAN) {
        errors.IBAN = 'vous devez choisir le code IBAN';
    }else if (!IBAN.isValid(values.IBAN)){
        errors.IBAN = 'vous devez saisir un IBAN valid';
    }if (!values.adresse1) {
        errors.adresse1 = 'vous devez choisir le code IBAN';
    }if (!values.banque) {
        errors.banque = 'vous devez choisir la banque';
    }if (!values.libelle) {
        errors.libelle = 'vous devez choisir le libelle';
    }if (!values.devise) {
        errors.devise = 'vous devez choisir la devise';
    }if (!values.nature) {
        errors.nature = 'vous devez choisir la nature';
    }if (!values.pays) {
        errors.pays = 'vous devez choisir le pays';
    }if (!values.routing) {
        errors.routing = 'vous devez saisir le Routing ou Fedwire number';
    }else if (values.routing.length < 9) {
        errors.routing = 'vous devez saisir un nombre de 9 positions';
    }
    return errors
}
