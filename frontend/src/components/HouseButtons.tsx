import React from 'react';
import { Box, Button } from '@mui/joy';
import grundriss from '../images/grundriss.jpg';
import {Link} from "react-router-dom";

const ImageBoxWithButtons: React.FC = () => {
    return (
        <Box
            sx={{
                position: 'relative',
                width: '550px',
                height: '500px',
                backgroundImage: `url(${grundriss})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '10px',
                overflow: 'hidden',
            }}
        >
            {/* Top Button */}
            <Button
                variant="outlined"
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '30%',
                    backgroundColor: 'rgba(192, 192, 192, 0.4)',
                    color: '#fff',
                    '&:hover': {
                        backgroundColor: 'rgba(192, 192, 192, 0.7)',
                    },
                }}
                component={Link}
                to="/backdoor"
            >
                Back Door
            </Button>

            {/* Bottom Button */}
            <Button
                variant="outlined"
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '30%',
                    backgroundColor: 'rgba(192, 192, 192, 0.4)',
                    color: '#fff',
                    '&:hover': {
                        backgroundColor: 'rgba(192, 192, 192, 0.7)',
                    },
                }}
                component={Link}
                to="/frontdoor"
            >
                Front Door
            </Button>
        </Box>
    );
};

export default ImageBoxWithButtons;
