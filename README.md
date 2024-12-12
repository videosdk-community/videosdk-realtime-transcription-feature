# Real-Time Transcription with VideoSDK

Real-time transcription turns spoken words into instant text, transforming how meetings, webinars, and classes are experienced. With VideoSDK, integrating this feature into your React app is intuitive and customizable.

[![Watch the video](https://img.youtube.com/vi/bhPgjMXL6H8/0.jpg)](https://youtu.be/bhPgjMXL6H8)

## Getting Started

Begin by cloning the example repository:

```bash
https://github.com/videosdk-community/videosdk-realtime-transcription-feature.git
```

Navigate to the cloned folder:

```bash
cd videosdk-realtime-transcription-feature
```

Install the required dependencies:

```bash
npm install
```

### Generate auth token

Generate a temporary token from your [Video SDK Account](https://app.videosdk.live/).:

copy .env.example

```shell
cp .env.example .env
```

Update the .env File:

```shell
VITE_VIDEOSDK_TOKEN = "videoSDK's authToken"
```

---

## App Architecture

The application follows a modular architecture for clarity and scalability:

![Application Architecture for VideoSDK's realtime transcription feature](/public/images/app-architecture.png)

---

## Breaking Down the Code

### useTranscription Hook

VideoSDK’s useTranscription hook provides method to start and stop transcription, updating the text in real time. The onTranscriptionStateChanged event handler manages the transcription state, while onTranscriptionText updates the displayed transcribed text.

```javascript
import { useTranscription } from '@videosdk.live/react-sdk';

const { startTranscription, stopTranscription } = useTranscription({
  onTranscriptionStateChanged: (status) => {
    /* Handle state changes */
  },
  onTranscriptionText: (data) => {
    /* Handle transcription text */
  },
});
```

### Manage Transcription State

You can track the current transcription state using the transcriptionState property from the useMeeting hook.

- By dynamically reflecting these states in your UI or logs, you can provide real-time feedback to users about the transcription process.

```javascript
import { useMeeting } from "@videosdk.live/react-sdk";

// Current state of real-time transcription.
// Possible values:
// - TRANSCRIPTION_STARTING
// - TRANSCRIPTION_STARTED
// - TRANSCRIPTION_STOPPING
// - TRANSCRIPTION_STOPPED

const { transcriptionState } = useMeeting({...});
```

### All Possible States for Transcription

The key states you may encounter during the transcription lifecycle:

```javascript
import { Constants } from '@videosdk.live/react-sdk';

const {
  TRANSCRIPTION_STARTING,
  TRANSCRIPTION_STARTED,
  TRANSCRIPTION_STOPPING,
  TRANSCRIPTION_STOPPED,
} = Constants.transcriptionEvents;
```

---

## Handling the Start and Stop of Transcription & managing application UI

By utilizing the useMeeting and useTranscription hooks from VideoSDK, you can track the transcription's current state and toggle it as needed.

- **Tracking State**: The transcriptionState from useMeeting monitors if transcription is starting, started, stopping, or stopped.
- **Dynamic Toggles**: The handleTranscription function uses this state to determine whether to call startTranscription or stopTranscription.
- **Live Feedback**: As transcription progresses, real-time updates are displayed, ensuring users always know the transcription status.

Here’s how you can handle transcription state and manage UI updates:

```javascript
import {
  useMeeting,
  useTranscription,
  Constants,
} from '@videosdk.live/react-sdk';

export const MeetingView = () => {
  // Stores live transcription text
  const [transcriptionText, setTranscriptionText] = useState('');

  // Tracks the current transcription state
  const { transcriptionState } = useMeeting();

  const { startTranscription, stopTranscription } = useTranscription({
    // Updates transcription text on new data
    onTranscriptionText: (data) => {
      const { text } = data;
      setTranscriptionText(text);
    },
  });

  // Possible transcription states
  const {
    TRANSCRIPTION_STARTED,
    TRANSCRIPTION_STARTING,
    TRANSCRIPTION_STOPPED,
    TRANSCRIPTION_STOPPING,
  } = Constants.transcriptionEvents;

  const handleTranscription = () => {
    // Toggles transcription based on the current state
    if (transcriptionState === TRANSCRIPTION_STARTED) {
      stopTranscription();
    } else if (transcriptionState === TRANSCRIPTION_STOPPED) {
      startTranscription();
    }
  };

  return (
    <div>
      <button onClick={handleTranscription}>
        {/* Dynamically changes button text */}
        {transcriptionState === TRANSCRIPTION_STARTED
          ? 'Stop Transcription'
          : transcriptionState === TRANSCRIPTION_STARTING
            ? 'Starting...'
            : 'Start Transcription'}
      </button>
      {/* Displays live transcription text */}
      {transcriptionState === TRANSCRIPTION_STARTED && (
        <div>{transcriptionText}</div>
      )}
    </div>
  );
};
```

---

## Webhooks

Now that you’ve seen how easy it is to integrate real-time transcription into your application, there’s even more you can do—utilizing webhooks to bridge the gap between your system and VideoSDK.

```javascript
const handleTranscription = () => {
  if (transcriptionState === TRANSCRIPTION_STARTED) {
    stopTranscription();
  } else if (transcriptionState === TRANSCRIPTION_STOPPED) {
    startTranscription({
      webhookUrl: 'your webhook url',
    });
  }
};
```

### Transcription Started

```json
{
  "webhookType": "transcription-started",
  "data": {
    "type": "realtime",
    "id": "xxxxxxx-354d-415b-886a-317d9236b2bb",
    "meetingId": "aaaa-bbbb-cccc",
    "sessionId": "675a9ad9ab022b1e6896e1f9"
  }
}
```

### Transcription Stopped

```json
{
  "webhookType": "transcription-stopped",
  "data": {
    "type": "realtime",
    "id": "xxxxxxx-354d-415b-886a-317d9236b2bb",
    "meetingId": "aaaa-bbbb-cccc",
    "sessionId": "675a9ad9ab022b1e6896e1f9"
  }
}
```

---

## Documentation

For more detailed information, visit the [VideoSDK Documentation](https://docs.videosdk.live/).

---
