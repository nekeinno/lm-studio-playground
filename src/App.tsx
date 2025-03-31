import "./App.css";
import { useEffect, useState } from "react";
import { getAvailableModels, sendPrompt } from "./lm-studio";

function App() {
  const [prompt, setPrompt] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [response, setResponse] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [models, setModels] = useState<string[]>([]);

  const onSubmit = async () => {
    setIsProcessing(true);
    try {
      const response = await sendPrompt(prompt, selectedModel);
      setResponse(response);
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    getAvailableModels().then((models: string[]) => {
      setModels(models);
      if (models.length > 0) {
        setSelectedModel(models[0]);
      }
    });
  }, []);

  const isSubmissionValid = prompt && selectedModel && !isProcessing;

  return (
    <>
      <h1>On-device Dream Analysis via LM Studio</h1>
      <div className="card">
        <div style={{ width: "50rem", display: "flex", flexDirection: "column" }}>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
          >
            {models.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
          <button onClick={onSubmit} disabled={!isSubmissionValid}>
            Submit
          </button>

          {response && <code style={{ marginTop: "2em" }}>{response}</code>}
        </div>
      </div>
    </>
  );
}

export default App;
