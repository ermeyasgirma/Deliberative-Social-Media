const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block',
        marginLeft: theme.spacing(1) * 3,
        marginRight: theme.spacing(1) * 3,
        [theme.breakpoints.up(400 + theme.spacing(1) * 3 * 2)]: {
        width: 600,
        marginLeft: 'auto',
        marginRight: 'auto',
        },
    },
    createTopic: {
        background: '#9F5AA2',
        color: 'white',
        float: 'right',
        margin: '20px',
        maxWidth: '200px'
    },
    grid: {
        width: '80%',
        margin: 'auto',
    },
    card: { 
        display: 'flex',
        flexDirection: 'column',  
        minHeight: '500px',
        height: '100%',
        padding: '2.5%',
        margin: '2.5%',
        alignItems: 'center'
    },
    cardMedia: {
        height: '300px'
    },
    cardContent: {   
        textAlign: 'center',
        height: '100%',  
        width: '100%'
    },
    cardActions: {
        width: '100%'
    },
    separator: {
        borderTop: '5px solid #BC8CBE',
        borderRadius: '5px',
        width: '100%',
        marginTop: '10px',
        marginBottom: '10px'
    },
    heading: {
        fontSize: '30px',
        fontWeight: 'bold',
        marginTop: '1.5%',
        textAlign: 'center'
    },
    icons: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    weeks: {
        display: 'flex', 
        alignItems: 'center', 
        verticalAlign: 'middle'
    },
    weeksIcon: {
        float: 'left',
        fontSize: '40px',
        marginRight: '5%'
    },
    shareIcon: {
        float: 'right',
        fontSize: '40px'
    },
    moreIcon: {
        float: 'right',
        fontSize: '60px',
        marginLeft:'15%'
    },
    copyIcon: {
        fontSize: '30px',
        color: '#9F5AA2'
    },
    shareCard: {
        width: 'auto',
        display: 'flex',
        justifyContent: 'center',
        verticalAlign: 'middle'
    },
    box: {
        display: 'flex',
        textAlign: 'center',
        width: 'auto',
        height: 'auto',
        padding: '10px'
    },
    copyMessage: {
        backgroundColor: '#9F5AA2'
    },
    noMore: {
        margin: 'auto',
        textAlign: 'center'
    }
});
export default styles;


