import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import axios from "axios";

const styles = {
  classic: "🎩 Вишуканий та літературний стиль.",
  modern: "💬 Сучасний розмовний стиль.",
  humor: "😄 Жартівливий стиль.",
  poetic: "🌸 Поетичний та образний стиль.",
  academic: "📚 Науковий та аналітичний стиль."
};

function App() {
  const [message, setMessage] = useState("");
  const [style, setStyle] = useState("academic");
  const [reply, setReply] = useState("");

  const API_URL = import.meta.env.REACT_APP_API_URL || 'https://gemini-chat-rjgh.onrender.com'

  console.log('API_URL', API_URL)

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${API_URL}/chat`,
        { message, style }
      );
      console.log(response)
      setReply(response.data.reply);
    } catch (error) {
      console.error("Error fetching response:", error);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-3xl font-bold text-center">Запит до квантової механіки</h1>

      <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
        <textarea
          placeholder="Введіть ваше питання"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-1/2 p-3 border rounded-md"
        />

        <div className="w-1/2">
          <label className="text-lg font-semibold">Оберіть стиль відповіді</label>
          <select
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className="w-full p-2 mt-2 border rounded-md"
          >
            {Object.keys(styles).map((key) => (
              <option key={key} value={key}>
                {styles[key]}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="p-2 bg-blue-500 text-white rounded-md">
          Відправити
        </button>
      </form>

      {reply && (
        <div className="mt-4 p-4 bg-gray-100 border rounded-md">
          <h2 className="text-xl font-semibold">Відповідь:</h2>
          <div className="overflow-auto max-h-60 text-green-950">
            <p>{reply}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App
