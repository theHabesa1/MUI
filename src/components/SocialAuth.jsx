import { Icon } from "@iconify/react";
import { Stack, IconButton } from "@mui/material";
import { useGoogleLogin } from '@react-oauth/google';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'




const SocialAuth = () => {
  const login = useGoogleLogin({
    onSuccess: tokenResponse => console.log(tokenResponse),
  });

  const responseFacebook = (response) => {
    console.log(response);
  } 
  return (
    <>
      <Stack direction="row" spacing={2}>

        <IconButton
          sx={{
            border: "2px solid #ccc",
            borderRadius: "5px",
            padding: "0.5675rem",
            flex: 1,
          }}
          onClick={() => login()}
        >
          <Icon icon="eva:google-fill" color="#DF3E30" width={22} height={22} />
        </IconButton>

        <FacebookLogin
        appId="2390267887808250"
        autoLoad
        callback={responseFacebook}
        render={renderProps => (
            <IconButton
            onClick={renderProps.onClick}
              sx={{
                border: "2px solid #ccc",
                borderRadius: "5px",
                padding: "0.5675rem",
                flex: 1,
                
              }}
            >
              <Icon
                icon="eva:facebook-fill"
                color="#1877F2"
                width={22}
                height={22}
              />
            </IconButton>
          )}
          />
          
        <IconButton
          sx={{
            border: "2px solid #ccc",
            borderRadius: "5px",
            padding: "0.5675rem",
            flex: 1,
          }}
        >
          <Icon
            icon="eva:twitter-fill"
            color="#1C9CEA"
            width={22}
            height={22}
          />
        </IconButton>
      </Stack>
    </>
  );
};

export default SocialAuth;
