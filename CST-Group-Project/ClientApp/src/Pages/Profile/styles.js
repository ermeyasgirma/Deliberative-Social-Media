const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing(1) * 3,
        marginRight: theme.spacing(1) * 3,
        [theme.breakpoints.up(400 + theme.spacing(1) * 3 * 2)]: {
        width: 600,
        marginLeft: 'auto',
        marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(1) * 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: 'auto',
        padding: `${theme.spacing(1) * 2}px ${theme.spacing(1) * 3}px ${theme.spacing(1) * 3}px`,
    },
    heading: {
        fontSize: '38px',
        fontWeight: 'bold',
        marginTop: '2.5%',
        marginBottom: '3%'
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        backgroundColor: '#9F5AA2',
        marginTop: theme.spacing(1) * 3,
        marginBottom: theme.spacing(1) * 2,
        '&:hover': {
            backgroundColor: '#8A4F8C'
        }
    },
    noAccountHeader: {
        width: '100%',
        marginTop: theme.spacing(1)
    },
    linkLeft: {
        float: 'left',
        textDecoration: 'none',
        color: '#11151C',
        fontWeight: 'bolder',
        '&:hover': {
            color: '#EC3538'
        }
    },
    linkRight: {
        float: 'right',
        textDecoration: 'none',
        color: '#11151C',
        fontWeight: 'bolder',
        '&:hover': {
            color: '#EC3538'
        }
    },
    errorText: {
        color: 'red',
        textAlign: 'center'
    },
    grid: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 280
    },
    cssLabel: {
    color: '#D3D3D3',
    '&.Mui-focused': {
        color: '#9F5AA2'
    }
    },
    cssOutlinedInput: {
    '&:not(hover):not($disabled):not($cssFocused):not($error) $notchedOutline': {
        borderColor: '#D3D3D3'
    },
    '&:hover:not($disabled):not($cssFocused):not($error) $notchedOutline': {
        borderColor: '#485061'
    },
    '&$cssFocused $notchedOutline': {
        borderColor: '#9F5AA2'
    }
    },
    notchedOutline: {},
    cssFocused: {},
    error: {},
    disabled: {}
});

export default styles;