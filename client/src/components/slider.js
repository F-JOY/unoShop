import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import achat from '../images/achat.jpg';
import store from '../images/selling.jpg';
import affiliate from '../images/affiliate.png'
import promocasque from '../images/promo-casque.png'
import casque from '../images/casque.png'
import photo1 from '../images/photo1.png'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
     label: 'xxx',
    imgPath: photo1
      
      
  },
  {
    label: 'casque',
    imgPath: casque,
  },
  {  
    label: 'promo-casque',
    imgPath: promocasque,
   
  },
 
];

function Slide() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <Box  sx={{ flexGrow: 1}}>
      <Paper
        square
        elevation={0}
        sx={{
          position:'relative',
          display: 'flex',
          alignItems: 'center',
          height: 50,
          pl: 2,
          bgcolor: 'background.default',
        }}
      >
       
      </Paper>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  height: 400,
                  display: 'block',
                  width:"100%",
                  overflow: 'hidden',
                 
                 
                }}
                src={step.imgPath}
               
              />
            ) : null}
          </div>
        ))}
       
      </AutoPlaySwipeableViews>
       <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
           
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            
          </Button>
        }
      />
    </Box>
  );
}

export default Slide;