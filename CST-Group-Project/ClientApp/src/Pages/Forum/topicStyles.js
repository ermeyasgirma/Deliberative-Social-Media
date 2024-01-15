const styles = theme => ({
    main: {
        width: '100%',
        height: 'auto',
        display: 'inline-block', // Fix IE 11 issue.
        marginLeft: theme.spacing(1) * 3,
        marginRight: theme.spacing(1) * 3,
        [theme.breakpoints.up(400 + theme.spacing(1) * 3 * 2)]: {
            width: '1500px',
            height: '100%',
            marginLeft: 'auto',
            marginRight: 'auto'
        },
        marginBottom: '2%'
    },
    paper: {
        width: '100%',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        padding: `${theme.spacing(1) * 2}px ${theme.spacing(1) * 5}px ${theme.spacing(1) * 3}px`,
        alignItems: 'center'
    },
    heading: {
        fontSize: '42px',
        fontWeight: 'bold',
        marginTop: '1.5%',
        textAlign: 'center'
    },
    subheading: {
        fontSize: '25px',
        fontWeight: 'bold',
        height: '10%',
        marginBottom: '2%',
        '&::after': {
            content: '""',
            float: 'left',
            background: '#BC8CBE',
            width: '100%',
            height: '3px',
            borderRadius: '3px',
            marginTop: '3px'
        }
    },
    separator: {
        borderTop: '5px solid #BC8CBE',
        borderRadius: '5px',
        width: '100%',
        marginTop: '10px',
        marginBottom: '20px'
    },
    grid: {
        width: '100%',
        height: '550px',
        overflow: 'hidden'
    },
    card: {
        width: '100%',
        height: '100%',
        padding: '2.5%',
        borderColor: '#9F5AA2',
        overflow: 'hidden'
    },
    cardHeader: {
        fontSize: '36px',
        fontWeight: 'bold',
        height: '10%'
    },
    body: {
        height: '92%',
        paddingTop: '0%',
        overflow: 'hidden'
    },
    subcategoryCarousel: {
        width: '100%',
        margin: 'auto',
    },
    subcat: {
        width: '20px',
        margin: 'auto'
    }
});

export default styles;