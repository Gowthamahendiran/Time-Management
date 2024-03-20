import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

const LeaveReq = () => {

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_aye4c9j', 'template_8zlkf4r', form.current, 'co7f_i3okxfv-a8bC')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="user_name" />
      <label>Email</label>
      <input type="email" name="user_email" />
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form>
  );
};

export default LeaveReq
