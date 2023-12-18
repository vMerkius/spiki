import React, { useState } from "react";
import "./contact.scss";
import { IReportCreation } from "../../interfaces/IReport";
import { addReportAPI } from "../../server/server";

const topics = [
  "Chcę zgłosić błąd",
  "Chcę zgłosić propozycję zmiany",
  "Chcę zadać pytanie",
  "Inne",
];

const Contact = () => {
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    setIsEmailValid(emailRegex.test(emailValue));
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dataSend: IReportCreation = {
      email: email,
      topic: topic,
      message: message,
      isReviewed: false,
    };
    if (topic === "" || message === "" || email === "") {
      alert("Wypełnij wszystkie pola lub popraw adres email");
    } else if (!isEmailValid) {
      alert("Popraw adres email");
    } else {
      addReportAPI(dataSend);
      setTopic("");
      setEmail("");
      setMessage("");
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-form__item">
        <label htmlFor="email">Email:</label>
        <input
          className={`input-style ${!isEmailValid ? "invalid-email" : ""}`}
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </div>
      <div className="contact-form__item">
        <label htmlFor="topic">Temat:</label>
        <select
          className="input-style contact-form__item__choice"
          id="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          required
        >
          <option value="" disabled>
            Wybierz temat
          </option>
          {topics.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
      </div>
      <div className="contact-form__item">
        <label htmlFor="message">Wiadomość:</label>
        <textarea
          className="input-style"
          id="message"
          value={message}
          onChange={handleMessageChange}
          required
        ></textarea>
      </div>

      <button className="contact-form__submit" type="submit">
        Send
      </button>
    </form>
  );
};

export default Contact;
