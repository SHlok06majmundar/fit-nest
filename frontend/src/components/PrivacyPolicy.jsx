import React from "react";

const PrivacyPolicy = () => {
  const containerStyle = {
    backgroundColor: "#000",
    color: "#fff",
    minHeight: "100vh",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    overflowY: "auto",
    fontFamily: "Arial, sans-serif",
  };

  const headerStyle = {
    fontSize: "2.5rem",
    fontWeight: "extrabold",
    marginBottom: "30px",
    textAlign: "center",
    color: "#fff",
  };

  const contentStyle = {
    maxWidth: "80%",
    lineHeight: "1.8",
    textAlign: "justify",
    fontSize: "1rem",
    padding: "25px",
    backgroundColor: "#000",
    borderRadius: "8px",
    boxShadow: "0px 4px 6px rgba(18, 72, 7, 0.84)",
  };

  const sectionHeaderStyle = {
    fontSize: "1.25rem",
    fontWeight: "bold",
    marginTop: "25px",
    marginBottom: "10px",
    color: "#fff",
    display: "inline-block",
  };

  const sectionContentStyle = {
    marginBottom: "15px",
    lineHeight: "1.6",
  };

  const listStyle = {
    margin: "10px 0",
    paddingLeft: "20px",
    listStyleType: "disc", // Bullet point style
  };

  const contactLinkStyle = {
    color: "#00ff7f",
    textDecoration: "underline",
    cursor: "pointer",
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Privacy Policy</h1>
      <div style={contentStyle}>
        <div style={sectionContentStyle}>
          <span style={sectionHeaderStyle}>SECTION 1 - WHAT DO WE DO WITH YOUR INFORMATION?</span>
          <p>
            When you purchase something from our store, as part of the buying and selling process, we collect the personal
            information you give us such as your name, address and email address.
          </p>
          <p>
            When you browse our store, we also automatically receive your computer’s internet protocol (IP) address in order
            to provide us with information that helps us learn about your browser and operating system.
          </p>
          <p>
            Email marketing (if applicable): With your permission, we may send you emails about our store, new products and
            other updates.
          </p>
        </div>

        <div style={sectionContentStyle}>
          <span style={sectionHeaderStyle}>SECTION 2 - CONSENT</span>
          <p><strong>How do you get my consent?</strong></p>
          <p>
            When you provide us with personal information to complete a transaction, verify your credit card, place an order,
            arrange for a delivery or return a purchase, we imply that you consent to our collecting it and using it for that
            specific reason only.
          </p>
          <p>
            If we ask for your personal information for a secondary reason, like marketing, we will either ask you directly for
            your expressed consent, or provide you with an opportunity to say no.
          </p>
          <p><strong>How do I withdraw my consent?</strong></p>
          <p>
            If after you opt-in, you change your mind, you may withdraw your consent for us to contact you, for the continued
            collection, use or disclosure of your information, at anytime, by contacting us at{" "}
            <span style={contactLinkStyle}>fitnest.patna@gmail.com</span> or mailing us at: Fit Nest, 3rd floor, Sisodia Palace,
            East Boring Canal Road, Shree Krishna Puri, Patna, Bihar 8000001.
          </p>
        </div>

        <div style={sectionContentStyle}>
          <span style={sectionHeaderStyle}>SECTION 3 - DISCLOSURE</span>
          <p>We may disclose your personal information if we are required by law to do so or if you violate our Terms of Service.</p>
        </div>

        <div style={sectionContentStyle}>
          <span style={sectionHeaderStyle}>SECTION 4 - PAYMENT</span>
          <p>
            We use Razorpay for processing payments. We/Razorpay do not store your card data on their servers. The data is
            encrypted through the Payment Card Industry Data Security Standard (PCI-DSS) when processing payment. Your purchase
            transaction data is only used as long as is necessary to complete your purchase transaction. After that is complete,
            your purchase transaction information is not saved.
          </p>
          <p>
            Our payment gateway adheres to the standards set by PCI-DSS as managed by the PCI Security Standards Council, which
            is a joint effort of brands like Visa, MasterCard, American Express and Discover.
          </p>
          <p>
            For more insight, you may also want to read terms and conditions of Razorpay on{" "}
            <a href="https://razorpay.com" style={contactLinkStyle}>https://razorpay.com</a>
          </p>
        </div>

        <div style={sectionContentStyle}>
          <span style={sectionHeaderStyle}>SECTION 5 - THIRD-PARTY SERVICES</span>
          <p>
            In general, the third-party providers used by us will only collect, use and disclose your information to the extent
            necessary to allow them to perform the services they provide to us.
          </p>
          <p>
            However, certain third-party service providers, such as payment gateways and other payment transaction processors,
            have their own privacy policies in respect to the information we are required to provide to them for your
            purchase-related transactions.
          </p>
          <p>
            For these providers, we recommend that you read their privacy policies so you can understand the manner in which your
            personal information will be handled by these providers.
          </p>
          <p>
            In particular, remember that certain providers may be located in or have facilities that are located a different
            jurisdiction than either you or us. So if you elect to proceed with a transaction that involves the services of a
            third-party service provider, then your information may become subject to the laws of the jurisdiction(s) in which
            that service provider or its facilities are located.
          </p>
          <p>
            Once you leave our store’s website or are redirected to a third-party website or application, you are no longer governed
            by this Privacy Policy or our website’s Terms of Service.
          </p>
        </div>

        <div style={sectionContentStyle}>
          <span style={sectionHeaderStyle}>SECTION 6 - SECURITY</span>
          <p>
            To protect your personal information, we take reasonable precautions and follow industry best practices to make sure
            it is not inappropriately lost, misused, accessed, disclosed, altered or destroyed.
          </p>
        </div>

        <div style={sectionContentStyle}>
          <span style={sectionHeaderStyle}>SECTION 7 - COOKIES</span>
          <p>We use cookies to maintain session of your user. It is not used to personally identify you on other websites.</p>
        </div>

        <div style={sectionContentStyle}>
          <span style={sectionHeaderStyle}>SECTION 8 - AGE OF CONSENT</span>
          <p>
            By using this site, you represent that you are at least the age of majority in your state or province of residence,
            or that you are the age of majority in your state or province of residence and you have given us your consent to
            allow any of your minor dependents to use this site.
          </p>
        </div>

        <div style={sectionContentStyle}>
          <span style={sectionHeaderStyle}>SECTION 9 - CHANGES TO THIS PRIVACY POLICY</span>
          <p>
            We reserve the right to modify this privacy policy at any time, so please review it frequently. Changes and
            clarifications will take effect immediately upon their posting on the website. If we make material changes to this
            policy, we will notify you here that it has been updated, so that you are aware of what information we collect, how
            we use it, and under what circumstances, if any, we use and/or disclose it.
          </p>
          <p>
            If our store is acquired or merged with another company, your information may be transferred to the new owners so
            that we may continue to sell products to you.
          </p>
        </div>

        <div style={sectionContentStyle}>
          <span style={sectionHeaderStyle}>QUESTIONS AND CONTACT INFORMATION</span>
          <p>
            If you would like to: access, correct, amend or delete any personal information we have about you, register a
            complaint, or simply want more information contact our Privacy Compliance Officer at{" "}
            <span style={contactLinkStyle}>fitnest.patna@gmail.com</span> or by mail at Fit Nest, 3rd floor, Sisodia Palace, East
            Boring Canal Road, Shree Krishna Puri, Patna, Bihar 8000001.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
