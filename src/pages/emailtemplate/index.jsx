import React from "react";
import "./index.scss";

const EmailTemplate = ({ email, resetLink }) => {
  return (
    <div className="email-template">
      <div className="email-header">
        <h1>Aurora aution</h1>
      </div>
      <div className="email-body">
        <h2>Password reset</h2>
        <p>Dear {email},</p>
        <p>
          We have received your request to change or reset your password. For
          your security, this link is only valid for 24 hours.
        </p>
        <a href={resetLink} className="reset-button">
          Change password
        </a>
        <p>
          Click the change password button or copy and paste the following URL
          into your browser:
          <br />
          <a href={resetLink}>{resetLink}</a>
        </p>
        <p>
          If you did not request a password change, please disregard this email
          and be sure that you can still log in to your account.
        </p>
      </div>
      <div className="email-footer">
        <p>Questions about Sotheby's? Please visit our FAQ or contact us.</p>
        <p>This email was sent to you by Sotheby's.</p>
        <p>Download the Sotheby's app for iOS and Android.</p>
        <p>Sotheby's</p>
        <p>1334 York Ave. New York, NY, 10021</p>
      </div>
    </div>
  );
};

export default EmailTemplate;
