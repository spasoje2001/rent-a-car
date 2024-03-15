<template>
    <footer>
        <div class="logo">
            <img src="../assets/logo.png" alt="Logo">
        </div>
        <div class="buttons">
            <button class="footer-button">
                <img class="button-icon" src="../assets/phone.png" alt="Contact Icon">
                Contact
            </button>
            <button class="footer-button">
                <img class="button-icon" src="../assets/about.png" alt="About Us Icon">
                About Us
            </button>
            <button class="footer-button">
                <img class="button-icon" src="../assets/help.png" alt="Help Icon">
                Help
            </button>
        </div>
        <div class="follow-icons">
            <span>Follow us</span>
            <img class="social-icon" src="../assets/facebook.png" alt="Instagram Icon">
            <img class="social-icon" src="../assets/instagram.png" alt="Facebook Icon">
            <img class="social-icon" src="../assets/twitter.png" alt="X Icon">
        </div>
    </footer>
</template>

<script>
    export default{
        data(){
            return{
            }
        }
    }
</script>

<style scoped>

footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #286fb4;
  padding: 10px 20px;
  color: white;
}

/* Style for the logo image */
.logo img {
  max-height: 70px; /* You can adjust the height as needed */
}

/* Style for the buttons container */
.buttons {
  display: flex;
  gap: 20px;
}

/* Style for the buttons */
.footer-button {
  background-color: transparent;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
}

/* Style for the button icons */
.button-icon {
  width: 24px; /* Adjust the size as needed */
  height: auto;
  margin-right: 5px; /* Adds spacing between icon and text */
}

/* Style for the follow text and icons container */
.follow-icons {
  display: flex;
  gap: 10px;
  align-items: center;
}

/* Style for the social media icons */
.social-icon {
  width: 24px; /* Adjust the size as needed */
  height: auto;
}



</style>