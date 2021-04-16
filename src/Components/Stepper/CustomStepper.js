import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import KeyboardOutlinedIcon from '@material-ui/icons/KeyboardOutlined';
import CreateIcon from '@material-ui/icons/Create';
import DehazeIcon from '@material-ui/icons/Dehaze';
import StepConnector from '@material-ui/core/StepConnector';
import {connect} from "react-redux";
import {setActiveStep} from "../../Actions/StepperActions";
import back from '../../media/virment.png';
import './CustomStepper.css';

const ColorlibConnector = withStyles({
    alternativeLabel: {
        top: 22,
    },
    active: {
        '& $line': {
            backgroundImage:
                'linear-gradient(90deg, rgba(247,94,30,1) 0%, rgba(247,94,30,1) 35%, rgba(247,94,30,1) 100%)',
        },
    },
    completed: {
        '& $line': {
            backgroundImage:
                'linear-gradient(90deg, rgba(247,94,30,1) 0%, rgba(247,94,30,1) 35%, rgba(247,94,30,1) 100%)',
        },
    },
    line: {
        height: 3,
        border: 0,
        backgroundColor: '#eaeaf0',
        borderRadius: 1,
    },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
    root: {
        backgroundColor: '#ccc',
        zIndex: 1,
        color: '#fff',
        width: 50,
        height: 50,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    active: {
        backgroundImage:
            'linear-gradient(90deg, rgba(247,94,30,1) 0%, rgba(247,94,30,1) 35%, rgba(247,94,30,1) 100%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    },
    completed: {
        backgroundImage:
            'linear-gradient(90deg, rgba(247,94,30,1) 0%, rgba(247,94,30,1) 35%, rgba(247,94,30,1) 100%)',
    },
});

function ColorlibStepIcon(props) {
    const classes = useColorlibStepIconStyles();
    const { active, completed } = props;

    const icons = {
        1: <KeyboardOutlinedIcon/>,
        2: <CreateIcon/>,
        3: <DehazeIcon/>,
    };

    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
                [classes.completed]: completed,
            })}
        >
            {icons[String(props.icon)]}
        </div>
    );
}


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    stepper :{
        backgroundImage: `url(${back})`,
        color:'red'
    }
}));
function CustomStepper(props) {
    const classes = useStyles();
    const activeStep = props.activeStep;
    const steps = ['SAISIE', 'SIGNATURE', 'RECAPUTILATIF'];

    return (
        <div className={classes.root}>
            <Stepper className={classes.stepper} alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
                {steps.map((label) => (
                    <Step key={label} >
                        <StepLabel className="step" StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </div>
    );
}
function mapDispatchToProps(dispatch) {
    return {
        setActiveStep: step => dispatch(setActiveStep(step))
    }
};

const mapStateToProps = state => {
    return { activeStep: state.StepperReducer.activeStep};
};

export default CustomStepper = connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomStepper);
