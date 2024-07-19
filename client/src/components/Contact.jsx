import { useState, useEffect } from "react"
import emailjs from 'emailjs-com';




function ContactPath({not, setNot, loading, setLoading}) {

    
  const [posts, setPosts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [inpVal, setInpVal] = useState("")
  const [error, setError] = useState(null); 

    
    function sendEmail(e) {
        e.preventDefault();
        setLoading({load: true, loadState: "", loadText: "Sending"});
        emailjs.sendForm('service_dozv0ck', 'template_62399ok', e.target, 'Ba88mfEJE2By2jU1N')
          .then((result) => {
            setLoading({load: true, loadState: "good", loadText: "Sent"});
      
      setTimeout(() => {
          setLoading({load:false, loadState: "", loadText: "Loading..."});
          
                  }, 2000)
                  
            // Add any success handling here (e.g., show a success message to the user)
          })
          .catch((error) => {
            setLoading({load: true, loadState: "bad", loadText: "failed"});
      
            setTimeout(() => {
                setLoading({load:false, loadState: "", loadText: "Loading..."});
                
                        }, 2000)
            // Add error handling here (e.g., show an error message to the user)
          });
      }
      
    
    return (

        <div className="msgus" id="contact">
        {/* message us */}
<h3>Contact Us</h3>
<form onSubmit={sendEmail}>
<input type="text" name="name" placeholder="Your full name" required/><br/>
<input type="email" name="useremail" placeholder="youremail@gmail.com" required/><br/>
<input hidden type="text" onChange={e => setInpVal(e.target.value)} name="message" id="message" value={inpVal}/>
<textarea name="messsage" onChange={e => setInpVal(e.target.value)} htmlFor="message" rows={7} placeholder="Your text goes here" required></textarea><br/>
<button type="submit">Send Message</button>
</form>

</div>



    )
}

export default ContactPath;