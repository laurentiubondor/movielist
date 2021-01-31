const footerTemplate = document.createElement('template');
footerTemplate.innerHTML = `
<style>
.footer {
    position: relative;
    left: 0;
    bottom: 0;
    right: 0;
    margin-top: 30px;
    padding-bottom: 20px;
    width: 100%;
    background: rgb(71, 13, 13);
    background: linear-gradient(
      357deg,
      rgba(71, 13, 13, 0.404096672848827) 0%,
      rgba(71, 13, 13, 1) 100%
    );
    color: white;
    display: flex;
    justify-content: space-evenly;
    flex-shrink: 0;
  }
  
  .company {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: table-cell;
    padding-left: 150px;
    color: white;
  }
  .company h3 {
    margin-left: 30px;
  }
  .company li {
    margin-bottom: 20px;
  }
  .company li a {
    text-decoration: none;
  }
  li > img {
    margin-bottom: -13px;
    margin-right: 5px;
  }

  .contact {
    list-style-type: none;
    margin: 0;
    padding: 0;
    text-align: center;
  }
  .icons {
    margin-left: auto;
    margin-right: auto;
  }
  
  .icon {
    display: inline-table;
    justify-content: space-between;
    width: 20%;
    height: 20%;
    padding-bottom: 20px;
  }
  
  .adress {
    padding-right: 150px;
  }
  .adress h3 {
    margin-left: 100px;
  }
  
  a:link {
    color: white;
  }
  
  .company a:visited {
    color: white;
  }
  
  .company img {
    width: 15%;
    height: 15%;
  }
  
  .adress img {
    width: 10%;
    height: 10%;
    margin-bottom: -13px;
    margin-right: 5px;
  }
</style
<footer>
  <div class = "footer">

    <div>
    <ul class ="company">
      <h3>Company</h3>
      <li><img src ="../../shared/images/bat.svg"><a href=#>About us</a></li>
      <li><img src ="../../shared/images/bat.svg"><a href=#>Our services</a></li>
      <li><img src ="../../shared/images/bat.svg"><a href=#>Contacts</a></li>
      <li><img src ="../../shared/images/bat.svg"><a href=#>Blogs</a></li>
    </ul>
  </div>
    <div class="contact">
      <h3>Contact</h3>
      <a href= mailto:myimdb@gmail.com subject="text">myimdb@gmail.com</a>
      <p><a href=+40755594329>+40755594329</a></p>

     <div class = "icons">
     <a href=#instagram class ="icon"><img src = "../../shared/images/instagram.svg"></a>
     <a href=#facebook class ="icon"><img src = "../../shared/images/facebook.svg"></a>
     <a href=#twitter class ="icon"><img src = "../../shared/images/twitter.svg"></a>
     </div>
    </div>

    <div class = "adress">
      <h3>Adress</h3>
      <p><img src ="../../shared/images/bat.svg">704 Hauser St., New York, N.Y.</p>
    </div>
  </div>
`;

class Footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'closed' });
    shadowRoot.appendChild(footerTemplate.content);
  }
}

customElements.define('footer-component', Footer);