import { fade } from '@material-ui/core/styles';

const styles = theme => ({
    main: {
        // backgroundColor: '#9F5AA2'
        backgroundImage: 'linear-gradient(to right, #9F5AA2, #EC3538)',
        display: 'flex',
        align: 'middle'
    },

    grow: {
        flexGrow: 1,
    },

    menuButton: {
        marginRight: theme.spacing(4),
    },

    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },

    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },

    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    inputRoot: {
        color: 'inherit',
    },

    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },

    buttons: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },

    login: {
        width: '100px',
        height: '40px',
        margin: '20px'
    },

    logout: {
        width: '100px',
        height: '40px',
        marginLeft: '20px'
    },

    profile: {
        fontSize: '40px',
        marginRight: '20px'
    }
});

export default styles;