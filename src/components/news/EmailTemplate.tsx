import React from 'react';

interface EmailTemplateProps {
  issueDate: string;
  kicker: string;
  headline: string;
  dek: string;
  bodyHtml: string; // The 350-650 word essay HTML
  action: string;
  cultureLinks: Array<{ title: string; url: string }>;
  businessLinks: Array<{ title: string; url: string }>;
  ideasLinks: Array<{ title: string; url: string }>;
}

export function EmailTemplate({
  issueDate,
  kicker,
  headline,
  dek,
  bodyHtml,
  action,
  cultureLinks,
  businessLinks,
  ideasLinks
}: EmailTemplateProps) {
  // Styles inline for email compatibility
  const bgNewsprint = "#F6F1E8";
  const textInk = "#111111";
  const textRed = "#C0272D";
  const borderGray = "#D9D1C4";

  return (
    <div style={{ backgroundColor: bgNewsprint, color: textInk, fontFamily: "Helvetica, Arial, sans-serif", margin: 0, padding: "20px 0" }}>
      <table width="100%" cellPadding="0" cellSpacing="0" style={{ maxWidth: "600px", margin: "0 auto", backgroundColor: bgNewsprint }}>
        <tbody>
          
          {/* Header */}
          <tr>
            <td style={{ borderBottom: `4px solid ${textInk}`, paddingBottom: "20px" }}>
              <h1 style={{ fontSize: "36px", margin: "0 0 5px 0", textTransform: "uppercase", letterSpacing: "-1px" }}>ADN</h1>
              <p style={{ margin: 0, fontSize: "14px", textTransform: "uppercase", letterSpacing: "1px", color: `${textInk}B3` }}>
                Artist Daily News · {issueDate}
              </p>
            </td>
          </tr>

          {/* Hero */}
          <tr>
            <td style={{ paddingTop: "30px", paddingBottom: "30px" }}>
              <span style={{ backgroundColor: textInk, color: bgNewsprint, padding: "4px 8px", fontSize: "12px", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "bold" }}>
                Kicker: {kicker}
              </span>
              <h2 style={{ fontSize: "32px", margin: "15px 0", lineHeight: "1.2" }}>{headline}</h2>
              <p style={{ fontSize: "16px", color: textRed, borderLeft: `4px solid ${textRed}`, paddingLeft: "15px", margin: "0 0 25px 0" }}>
                {dek}
              </p>
              
              <div dangerouslySetInnerHTML={{ __html: bodyHtml }} style={{ fontSize: "16px", lineHeight: "1.6", color: `${textInk}E6` }} />
              
              <p style={{ fontWeight: "bold", marginTop: "25px", fontSize: "16px" }}>
                Action: {action}
              </p>
            </td>
          </tr>

          {/* Source Row Table (3-column) */}
          <tr>
            <td style={{ borderTop: `4px solid ${textInk}`, paddingTop: "30px", paddingBottom: "40px" }}>
              <table width="100%" cellPadding="0" cellSpacing="0">
                <tbody>
                  <tr>
                    {/* Culture */}
                    <td width="33%" valign="top" style={{ paddingRight: "10px" }}>
                      <h3 style={{ borderBottom: `1px solid ${borderGray}`, paddingBottom: "5px", textTransform: "uppercase", fontSize: "14px", margin: "0 0 15px 0" }}>Culture</h3>
                      {cultureLinks.map((link, i) => (
                        <p key={i} style={{ margin: "0 0 10px 0", fontSize: "13px", lineHeight: "1.4" }}>
                          <a href={link.url} style={{ color: textInk, textDecoration: "none", fontWeight: "bold" }}>{link.title}</a>
                        </p>
                      ))}
                    </td>
                    {/* Business */}
                    <td width="33%" valign="top" style={{ paddingRight: "10px", paddingLeft: "10px" }}>
                      <h3 style={{ borderBottom: `1px solid ${borderGray}`, paddingBottom: "5px", textTransform: "uppercase", fontSize: "14px", margin: "0 0 15px 0" }}>Business</h3>
                      {businessLinks.map((link, i) => (
                        <p key={i} style={{ margin: "0 0 10px 0", fontSize: "13px", lineHeight: "1.4" }}>
                          <a href={link.url} style={{ color: textInk, textDecoration: "none", fontWeight: "bold" }}>{link.title}</a>
                        </p>
                      ))}
                    </td>
                    {/* Ideas */}
                    <td width="33%" valign="top" style={{ paddingLeft: "10px" }}>
                      <h3 style={{ borderBottom: `1px solid ${borderGray}`, paddingBottom: "5px", textTransform: "uppercase", fontSize: "14px", margin: "0 0 15px 0" }}>Ideas</h3>
                      {ideasLinks.map((link, i) => (
                        <p key={i} style={{ margin: "0 0 10px 0", fontSize: "13px", lineHeight: "1.4" }}>
                          <a href={link.url} style={{ color: textInk, textDecoration: "none", fontWeight: "bold" }}>{link.title}</a>
                        </p>
                      ))}
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          {/* Footer CTA */}
          <tr>
            <td style={{ backgroundColor: textInk, color: bgNewsprint, padding: "30px", textAlign: "center" }}>
              <h2 style={{ margin: "0 0 15px 0", fontSize: "24px" }}>Make this about your catalog</h2>
              <p style={{ margin: "0 0 20px 0", opacity: 0.8, fontSize: "14px" }}>Get a personalized digest filtered by your genre and city.</p>
              <a href="https://news.artispreneur.com/newsroom" style={{ display: "inline-block", backgroundColor: textRed, color: bgNewsprint, padding: "12px 24px", textDecoration: "none", fontWeight: "bold", textTransform: "uppercase", fontSize: "14px", letterSpacing: "1px" }}>
                Build Your Newsroom
              </a>
            </td>
          </tr>
          
          {/* Unsubscribe Footer */}
          <tr>
            <td style={{ paddingTop: "30px", textAlign: "center", fontSize: "12px", color: `${textInk}B3` }}>
              <p>Artispreneur · Art means business.</p>
              <p><a href="{{unsubscribe_url}}" style={{ color: `${textInk}B3` }}>Unsubscribe</a> · <a href="{{share_url}}" style={{ color: `${textInk}B3` }}>Share this issue</a></p>
            </td>
          </tr>

        </tbody>
      </table>
    </div>
  );
}
