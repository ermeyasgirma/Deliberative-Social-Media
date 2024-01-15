const styles = theme => ({
    thumbnail: {
        display: 'flex',
        flexDirection: 'column',
        height: 'auto',
        width: '45%',
        padding: `${theme.spacing(1) * 2}px ${theme.spacing(1) * 3}px ${theme.spacing(1) * 3}px`,
        alignItems: 'center'
    },
    modal: {
        overflowY: 'scroll',
        zIndex: theme.zIndex.drawer
    },
    thumbnailTitle: {
        fontWeight: 'bold'
    },
    thumbnailDescription: {
        textAlign: 'justify'
    },    
    description: {
        textAlign: 'justify',
        marginLeft: '2.5%',
        marginRight: '2.5%'
    },
    separator: {
        borderTop: '5px solid #BC8CBE',
        borderRadius: '5px',
        width:'97.5%',
        marginTop: '10px',
        marginBottom: '20px'
    },
    accordion: {
        width: '95%',
        marginBottom: '25px'
    },
    grid: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff'
    },
    popup:{
        float: 'left',
    },
    main: {
        width: '70%',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing(1) * 3,
        marginRight: theme.spacing(1) * 3,
        [theme.breakpoints.up(400 + theme.spacing(1) * 3 * 2)]: {
        marginLeft: 'auto',
        marginRight: 'auto'
        },
        marginBottom: '2%'
    },
    card: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: theme.spacing(1) * 10,
        display: 'flex',
        flexDirection: 'column',
        height: 'auto',
        width: '100%',
        padding: `${theme.spacing(1) * 2}px ${theme.spacing(1) * 3}px ${theme.spacing(1) * 3}px`,
        alignItems: 'center',
        borderRadius: '5px',
        borderColor: '#9F5AA2'
    },
    heading: {
        fontSize: '38px',
        fontWeight: 'bold',
        marginTop: '1%',
        textAlign: 'center'
    },
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    postGrid: {
        marginLeft: '5%',
        marginRight: '5%'
    },
    post: {
        margin: '10%'
    }
});

export default styles;