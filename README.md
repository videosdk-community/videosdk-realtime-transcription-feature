# Real-Time Transcription with VideoSDK

Real-time transcription turns spoken words into instant text, transforming how meetings, webinars, and classes are experienced. With VideoSDK, integrating this feature into your React app is intuitive and customizable.

---

## Getting Started

Begin by cloning the example repository:

```bash
git clone https://github.com/sumit-so/videosdk-react-example.git
```

Navigate to the cloned folder:

```bash
cd videosdk-react-example
```

Install the required dependencies:

```bash
npm install
```

---

## App Architecture

The application follows a modular architecture for clarity and scalability:

```
├── public
├── src
│   ├── components
│   │   ├── joinscreen/index.jsx
│   │   ├── meetingview/index.jsx
│   │   ├── controls/index.jsx
│   ├── API.js
│   ├── App.jsx
│   ├── ..
├── ..
```

---

## Breaking Down the Code

### Step 1: Import Transcription Hook

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

### Step 2: Manage Transcription State

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

### Step 3: Constants for Transcription Events

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

## Handling Start and Stop of Transcription

Here’s how you can handle transcription state and manage UI updates:

```javascript
import {
  useMeeting,
  useTranscription,
  Constants,
} from '@videosdk.live/react-sdk';

export const MeetingView = () => {
  const [transcriptionText, setTranscriptionText] = useState('');
  const { transcriptionState } = useMeeting();

  const { startTranscription, stopTranscription } = useTranscription({
    onTranscriptionText: (data) => {
      setTranscriptionText(data.text);
    },
  });

  const {
    TRANSCRIPTION_STARTED,
    TRANSCRIPTION_STARTING,
    TRANSCRIPTION_STOPPED,
    TRANSCRIPTION_STOPPING,
  } = Constants.transcriptionEvents;

  const handleTranscription = () => {
    if (transcriptionState === TRANSCRIPTION_STARTED) {
      stopTranscription();
    } else if (transcriptionState === TRANSCRIPTION_STOPPED) {
      startTranscription();
    }
  };

  return (
    <div>
      <button onClick={handleTranscription}>
        {transcriptionState === TRANSCRIPTION_STARTED
          ? 'Stop Transcription'
          : transcriptionState === TRANSCRIPTION_STARTING
            ? 'Starting...'
            : 'Start Transcription'}
      </button>
      {transcriptionState === TRANSCRIPTION_STARTED && (
        <div>{transcriptionText}</div>
      )}
    </div>
  );
};
```

---

## Webhooks

To integrate webhooks for transcription events:

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

Happy coding! 🚀
