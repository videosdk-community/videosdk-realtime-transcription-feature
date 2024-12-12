import { useState } from 'react';
import { MeetingProvider } from '@videosdk.live/react-sdk';

import { Container } from './components/container';
import { MeetingView } from './components/meetingview';
import { JoinScreen } from './components/joinscreen';
import { authToken, createMeeting } from './API';

function App() {
  const [meetingId, setMeetingId] = useState(null);
  const [participantName, setParticipantName] = useState('');

  const getMeetingId = async (id) => {
    const meetingId =
      id == null ? await createMeeting({ token: authToken }) : id;
    setMeetingId(meetingId);
  };

  const onMeetingLeave = () => {
    setMeetingId(null);
  };

  return (
    <Container>
      {meetingId && participantName ? (
        <MeetingProvider
          token={authToken}
          config={{
            name: participantName,
            meetingId,
            micEnabled: true,
            webcamEnabled: true,
          }}
        >
          <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
        </MeetingProvider>
      ) : (
        <JoinScreen
          getMeetingId={getMeetingId}
          name={participantName}
          setName={setParticipantName}
        />
      )}
    </Container>
  );
}

export default App;
