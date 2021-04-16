export const validate = values => {
    const errors = {}
    if (!values.compteDebite) {
        errors.compteDebite = 'vous devez choisir le compte à débiter'
    }
    return errors
}
