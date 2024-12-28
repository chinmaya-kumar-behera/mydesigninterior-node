const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs"); // Set EJS as the template engine
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));  

// Routes
app.get("/", (req, res) => {
  // res.send("API is working fine !")
  res.render("index", { title: "Home" });
});

app.get("/contact", (req, res) => {
  res.send("Hello from /contact")
  res.render("contact", { title: "Contact" });
});

// Route to handle form submission
app.post('/contact', async (req, res) => {
    const { full_name, email, phone_number, feedback } = req.body;

    // Nodemailer configuration
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL, // Your email address
            pass: process.env.PASSWORD, // Your email password or app-specific password
        },
    });

    const mailOptions = {
        from: email, // Sender email
        to: 'web.chinu2127@gmail.com', // Replace with your email
        subject: 'New Contact Form Submission',
        text: `
            Full Name: ${full_name}
            Email: ${email}
            Phone Number: ${phone_number}
            Feedback: ${feedback}
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.send('<h1>Message sent successfully!</h1>');
    } catch (error) {
        console.error(error);
        res.send('<h1>Failed to send message. Please try again.</h1>');
    }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
