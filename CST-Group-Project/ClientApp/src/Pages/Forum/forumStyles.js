const styles = theme => ({
    main: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        marginLeft: theme.spacing(1) * 3,
        marginRight: theme.spacing(1) * 3,
        alignItems: 'center',
        [theme.breakpoints.up(400 + theme.spacing(1) * 3 * 2)]: {
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        zIndex: -1
        }
    },
    topic: {
        width: '100%',
        height: '100%',
        maxHeight: '1000px'
    },
    tabs: {
        width: '1500px',
        marginTop: theme.spacing(1) * 3,
    },
});

export default styles;