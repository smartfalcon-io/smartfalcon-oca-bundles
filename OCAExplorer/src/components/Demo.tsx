import { Typography, Link } from "@mui/material";
import Joyride, {STATUS} from 'react-joyride';
import { Theme } from '@mui/material/styles';

const demoStates = {
  introSteps: [
    {
      target: "body",
      disableBeacon: true,
      position: "center",
      title: <Typography variant="h3">What Is OCA Explorer?</Typography>,
      content: (
	<Typography variant="h5">
	  The OCA Explorer is intended to assist in the creating of creating&nbsp;
	  <Link href="https://oca.colossi.network/">Overlays Capture Architecture(OCA)</Link>
	         &nbsp;
	bundles and previewing
	         &nbsp;
	<Link href="https://github.com/swcurran/aries-rfcs/tree/oca4aries/features/0755-oca-for-aries#aries-specific-branding-overlay">Branding Overlays</Link>.
	  </Typography>
      )
    },
    {
      target: '#overlay-bundle-id',
      position: "center",
      disableBeacon: true,
      title: <Typography variant="h3">Selecting an OCA Bundle</Typography>,
      content: (
	<Typography variant="h5">
	  Here you can select a Pre-existing OCA Bundle
	</Typography>
      )
    },
    {
      target: '#upload-oca-bundle-button',
      title: <Typography variant="h3">Uploading a new OCA Bundle</Typography>,
      content: (
	<Typography variant="h5">
	  If you would like to upload your own OCA Bundle click here
	</Typography>
      ),
    },
  ],
  brandingSteps : [
    {
      target: '#overlay-bundle-language-select',
      title: <Typography variant="h3">Previewing Languages</Typography>,
      content: (
	<Typography variant="h5">
	  To preview alternative languages select one of the following radio buttons
	</Typography>
      ),
    },
    {
      target: '#overlay-bundle-credential-card',
      title: <Typography variant="h3">Credential List Layout</Typography>,
      content: (
	<Typography variant="h5">
	  This is the current Credential List Layout
	</Typography>
      ),
    },
    {
      target: '#overlay-bundle-credential-details',
      title: <Typography variant="h3">Single Credential Layout</Typography>,
      content: (
	<Typography variant="h5">
	  Here is the current Single Credential Layout
	</Typography>
      ),
    },
    {
      target: '#overlay-bundle-branding-form-fields',
      title: <Typography variant="h3">Customizing Branding</Typography>,
      content: (
	<Typography variant="h5">
	  Here you can customize the branding for your overlay
	</Typography>
      ),
    },
    {
      target: "#overlay-branding-download-branding-overlay",
      title: <Typography variant="h3">Download Your Newly Created Branding</Typography>,
      content: (
	<Typography variant="h5">
	  Here you can customize the branding for your overlay
	</Typography>
      ),
  }]
}

export type DemoState = "NotRunning" | "RunningIntro" | "RunningBranding" | "RunningAll"

export function Demo({runDemo, theme, resetFunc }: {runDemo: DemoState, theme: Theme, resetFunc: () => void }) {
  const handleJoyrideCallback = (data: any) => {
    const { status, type } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      resetFunc()
    }
  }
  const steps: Array<any> =
    runDemo == "RunningIntro"      ? demoStates.introSteps
    : runDemo == "RunningBranding" ? demoStates.brandingSteps
    : runDemo == "RunningAll"      ? [...demoStates.introSteps, ...demoStates.brandingSteps]
    : []
  return <Joyride
	   callback={handleJoyrideCallback}
	   continuous
	   hideCloseButton
	   scrollToFirstStep
	   showSkipButton
	   steps={steps}
	   styles={{
             options: {
               arrowColor: "#fff",
               backgroundColor: "#fff",
               primaryColor: theme.palette.primary.dark,
               textColor: theme.palette.primary.main,
               width: 900,
               zIndex: 1000,
             }
	   }}
	   run={runDemo != "NotRunning"}
         />
}
