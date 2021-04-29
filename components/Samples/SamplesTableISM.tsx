import { Title } from "../Widgets/Title";
import { Copy } from "../Widgets/Copy";

export const ISM_FILES = [
  {
    title: "ISM file 720p H264 AAC OnDemand",
    isEncrypted: false,
    url:
      "https://playready.directtaps.net/smoothstreaming/SSWSS720H264/SuperSpeedway_720.ism/Manifest",
  },
  {
    title: "ISM File Audio Only OnDemand",
    isEncrypted: false,
    url:
      "https://playready.directtaps.net/smoothstreaming/ISMAAACLC/Taxi3_AACLC.ism/Manifest",
  },
  {
    title: "Big Buck Bunny OnDemand",
    isEncrypted: false,
    url:
      "https://amssamples.streaming.mediaservices.windows.net/683f7e47-bd83-4427-b0a3-26a6c4547782/BigBuckBunny.ism/manifest",
  },
];

export const SamplesTableISM = () => {
  return (
    <div className="widget-container">
      <div className="widget-header">
        <Title
          text="Samples SMOOTH files (.ism)"
          anchor="samples-files-other"
        />
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th colSpan="3">Smooth Samples (.ism)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Title</th>
              <th>Is Encrypted</th>
              <th>URL</th>
            </tr>
            {ISM_FILES.map((file) => (
              <tr key={file.title}>
                <td>{file.title}</td>
                <td>{String(file.isEncrypted)}</td>
                <td className="fileUrl-td">
                  {file.url.substring(0, 50)}
                  ...
                </td>
                <td>
                  <Copy text={file.url} color="black" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SamplesTableISM;
