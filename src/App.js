import { Importer, ImporterField } from 'react-csv-importer';
import 'react-csv-importer/dist/index.css';

function App() {
  function showMyAppToastNotification() {}
  function goToMyAppNextPage() {}
  function myAppMethod() {}
  function prepMyAppForIncomingData() {}

  return (
    <Importer
      chunkSize={10000}
      assumeNoHeaders={false}
      restartable={false}
      onStart={() => {
        prepMyAppForIncomingData();
      }}
      processChunk={async (rows) => {
        for (const row of rows) {
          await myAppMethod(row);
        }
      }}
      onComplete={() => {
        showMyAppToastNotification();
      }}
      onClose={() => {
        goToMyAppNextPage();
      }}
    >
      <ImporterField name="name" label="Name" />
      <ImporterField name="email" label="Email" />
      <ImporterField name="dob" label="Date of Birth" optional />
      <ImporterField name="postalCode" label="Postal Code" optional />
    </Importer>
  );
}

export default App;
