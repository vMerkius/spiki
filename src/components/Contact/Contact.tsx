import React, { useEffect, useState } from "react";
import "./contact.scss";
import { IReportCreation } from "../../interfaces/IReport";
import {
  addReportAPI,
  getUserAPI,
  getUserByEmailAPI,
} from "../../server/server";
import { jwtDecode } from "jwt-decode";

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

  useEffect(() => {
    const token = localStorage.getItem("token");
    let decodedToken: any;
    if (token) {
      decodedToken = jwtDecode(token);
    }
    const fetchUserByEmail = async () => {
      const res = await getUserAPI(decodedToken.userId);
      setEmail(res.email);
    };
    fetchUserByEmail();
  }, []);

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
        <h1>Kontakt</h1>
        <input
          className={` contact-form__item__input input-style ${
            !isEmailValid ? "invalid-email" : ""
          }`}
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
          required
        />
      </div>
      <div className="contact-form__item">
        <select
          className="input-style contact-form__item__choice contact-form__item__input"
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
        <textarea
          className="input-style contact-form__item__input"
          id="message"
          value={message}
          onChange={handleMessageChange}
          placeholder="Wiadomość"
          required
        ></textarea>
      </div>

      <button className="contact-form__submit" type="submit">
        Wyślij
      </button>
    </form>
  );
};

export default Contact;
