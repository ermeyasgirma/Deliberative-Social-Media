const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing(1) * 3,
        marginRight: theme.spacing(1) * 3,
        [theme.breakpoints.up(400 + theme.spacing(1) * 3 * 2)]: {
            width: 800,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(1) * 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: 'auto',
        padding: `${theme.spacing(1) * 2}px ${theme.spacing(1) * 3}px ${theme.spacing(1) * 3}px`,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    heading: {
        fontSize: '38px',
        fontWeight: 'bold',
        marginTop: '2.5%',
        marginBottom: '3%'
    },
    submit: {
        backgroundColor: '#9F5AA2',
        marginTop: theme.spacing(1) * 3,
        marginBottom: theme.spacing(1) * 2,
        '&:hover': {
            backgroundColor: '#8A4F8C'
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
    gender: {
        backgroundColor: '#9F5AA2',
        color: '#EEF0F2'
    },
    grid: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
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