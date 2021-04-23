
export const validate = values => {
    const errors = {}
    if(values.montantMin <= 0){
        errors.montantMin = 'le montant min doit être positif';
    }
    if(values.montantMax <= 0){
        errors.montantMax = 'le montant max doit être positif';
    } else if(parseInt(values.montantMax) <= parseInt(values.montantMin)){
        errors.montantMax = 'le montant max doit être supérieur au montant min';
    }
/*    if(values.dateFin && values.dateDebut && moment(values.dateFin) <= moment(values.dateDebut)){
        errors.dateFin = 'la date de fin doit être supérieure à la date de début';
    }*/
    return errors
}
