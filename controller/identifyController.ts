import { User as Contact  } from "../models/Details"

const user = async (req, res) => {
    try {
      
      const { email, phoneNumber } = req.body;
        const primaryContact = await Contact.findOne({
        $or: [{ email }, { phoneNumber }],
        linkPrecedence: "primary"
      });
  
      if (!primaryContact) {
        const newContact = new Contact({
          email,
          phoneNumber,
          linkPrecedence: "primary",
          linkedId: null
        });
        await newContact.save();
  
        return res.status(200).json({
          contact: {
            primaryContactId: newContact._id,
            emails: [email],
            phoneNumbers: [phoneNumber],
            secondaryContactIds: []
          }
        });
      } 
      else {
        
      const contacts = await Contact.find({
        $or: [{ email }, { phoneNumber }],
      });

      console.log("contacts", contacts)
      if (contacts.length > 1) {
        const contacts = await Contact.find({
          $or: [{ email }, { phoneNumber }],
          linkPrecedence: "primary"
        }).sort({ updatedAt: -1 });
        const newestContact = contacts[0];
        const firstContact = contacts[1];
    
        newestContact.linkPrecedence = "secondary";
        newestContact.linkedId = firstContact._id.toString();
        await newestContact.save();
      }
      else{
        const newContact = new Contact({
          email,
          phoneNumber,
          linkPrecedence: "secondary",
          linkedId: primaryContact._id.toString()

        });
        await newContact.save();

      }
      const contact = await Contact.find({
        $or: [{ email }, { phoneNumber }],
      });
      const uniqueEmails = Array.from(new Set([...contacts.map(c => c.email), email]));

      const uniquePhoneNumbers = Array.from(new Set([...contacts.map(c => c.phoneNumber), phoneNumber]));

      let secondaryContactIds = [...contact.map(c => c._id.toString())];
      secondaryContactIds.shift()

      return res.status(200).json({
        contact: {
          primaryContactId: primaryContact._id,
          emails: uniqueEmails,
          phoneNumbers: uniquePhoneNumbers,
          secondaryContactIds
        }
      });
  
      }

    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  };



  
  
  module.exports = { user };