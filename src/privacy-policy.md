# Privacy Policy — super fitting room

**Effective Date:** 2026-06-16
**Last Updated:** 2026-06-16

---

## 1. Who we are (Controller)

This Privacy Policy explains how **super fitting room (Hong Kong) Limited**
("**super fitting room**", "**we**", "**us**", or "**our**") collects, uses,
discloses, and protects personal information when you use the *super fitting room*
mobile application, website, and related services (collectively, the "**Service**").

- **Data controller:** super fitting room (Hong Kong) Limited, Hong Kong SAR
- **Privacy contact / Data Protection Officer:** dugu7008009@gmail.com
- **General support:** dugu7008009@gmail.com
- **App Store listing:** Apple App Store ID 6778457160 (`com.migambi.clothery`)

For the purposes of the GDPR we are the **controller** of your personal data. Our
AI generation and infrastructure vendors act as our **processors / sub-processors**
(see Section 8).

---

## 2. Summary (at a glance)

| Topic | In short |
|---|---|
| What we collect | Account data, your uploaded photos (including images of your face/body), body measurements you choose to enter, generated try-on images/videos, purchase records, referral data, device/usage data. |
| Why | To create your virtual try-on results, run your account, process purchases, prevent fraud/abuse, comply with law. |
| Sensitive data | Photos of identifiable people and body measurements are treated as **sensitive / special-category data**. We process them **only with your explicit consent**. |
| AI processing | Your images are sent to third-party AI generation providers to produce try-on images and videos. We do **not** sell your photos and do **not** use them to train AI models. |
| International transfer | Data may be processed outside your country, including by our hosting and AI vendors. We apply appropriate safeguards. |
| Your control | Access, export, correct, delete, restrict, or object — directly in the app or by emailing us. |
| Age | The Service is for users **18 and older**. |

---

## 3. The data we collect

### 3.1 Data you provide
- **Account & authentication:** email address and password (passwords are stored
  in hashed form by our authentication provider; we never see your plaintext
  password).
- **Profile data:** display name, profile preferences, and optional **body
  measurements** you enter (e.g., height, weight, gender) used to improve try-on
  results. Body measurements are **sensitive data**.
- **Photos and content you upload ("User Content"):**
  - **Self-portraits / person images** — photos of you or a person you are
    authorised to upload. These contain **images of identifiable individuals**
    (face and/or body) and are treated as **sensitive / special-category data**.
  - **Garment / product images** you upload or import.
  - **Wardrobe items** and saved looks.
- **Consent records:** the version, hash, and timestamp of consents you accept
  (e.g., the self-portrait upload consent) so we can prove lawful processing.
- **Communications:** messages you send to support and related metadata.

### 3.2 Data created by your use of the Service
- **Generated outputs:** virtual try-on images and videos produced from your
  inputs, and their storage references (gallery assets).
- **Credits & transactions:** your credit balance and a ledger of grants and
  consumption (e.g., image/video generation).
- **Referral data:** your referral code, referral bindings (inviter/invitee), and
  reward records.
- **Task / generation metadata:** parameters of each generation job, status, and
  timestamps.

### 3.3 Data collected automatically
- **Device & technical data:** device model, operating system, app version,
  language/region, IP address, and diagnostic identifiers.
- **Usage & log data:** feature interactions, request/trace identifiers, error
  logs, and performance metrics.
- **Push token:** if you enable notifications.

### 3.4 Data from third parties
- **Purchase confirmations** from Apple (App Store) and Stripe via RevenueCat
  (e.g., product purchased, transaction/entitlement identifiers, purchase status).
  **We do not receive or store your full payment card number.**

---

## 4. How we use your data and our legal bases (GDPR Art. 6 & Art. 9)

| Purpose | Categories used | Legal basis (GDPR) |
|---|---|---|
| Create your account and authenticate you | Account data | Performance of a contract (Art. 6(1)(b)) |
| **Generate virtual try-on images/videos from your photos** | Self-portraits, garment images, body measurements (sensitive) | **Your explicit consent** (Art. 6(1)(a) + Art. 9(2)(a)); withdrawable at any time |
| Store and show your saved looks, wardrobe, gallery | User Content, outputs | Contract (Art. 6(1)(b)) |
| Process purchases and manage credits | Purchase records, transactions | Contract (Art. 6(1)(b)); legal obligation for tax/records (Art. 6(1)(c)) |
| Operate the referral program | Referral data | Contract / legitimate interests (Art. 6(1)(b)/(f)) |
| Security, fraud and abuse prevention, debugging | Device, usage, log data | Legitimate interests (Art. 6(1)(f)) |
| Customer support | Communications, account data | Contract / legitimate interests |
| Send notifications you enabled | Push token | Consent (Art. 6(1)(a)) |
| Comply with legal obligations and respond to lawful requests | As required | Legal obligation (Art. 6(1)(c)) |

We rely on **explicit consent** for processing photos of identifiable people and
body measurements. **You can withdraw consent at any time** (Section 10); this does
not affect processing already carried out, and may mean we can no longer provide
the try-on feature.

We do **not** use your User Content to train, fine-tune, or develop machine
learning models, and we do **not** sell your personal information.

---

## 5. Automated processing

Virtual try-on results are produced by automated AI systems. This processing
generates images/videos from your inputs and does **not** produce legal or
similarly significant effects about you. We do not use it for profiling,
credit/eligibility scoring, or any decision producing legal effects.

---

## 6. Children

The Service is intended **only for adults aged 18 or older**. We do not knowingly
collect personal data from anyone under 18. If you believe a minor has provided us
data, contact dugu7008009@gmail.com and we will delete it.

---

## 7. Retention

We keep personal data only as long as needed for the purposes above:

| Data | Retention |
|---|---|
| Self-portraits / person images & generated outputs | Kept while your account is active or until you delete them; deleted from active systems within 30 days of account or item deletion. |
| Body measurements | Until you remove them or delete your account. |
| Account data | For the life of your account. |
| Purchase & credit ledger | Retained as required for tax/accounting and dispute resolution (up to 7 years), even after account deletion, in a minimised form. |
| Consent records | Retained as evidence of lawful processing for the applicable limitation period. |
| Logs/diagnostics | Short-term (up to 90 days). |

When you exercise deletion, we remove your images from object storage and delete
the associated database records; certain minimised records may be retained where
required by law (e.g., financial records).

---

## 8. Who we share data with (processors & sub-processors)

We share personal data only with vendors that process it **on our behalf and under
contract**, or where required by law. We do **not** sell personal data.

| Recipient | Role | Data | Location |
|---|---|---|---|
| **Supabase** | Authentication, database, object storage, edge functions (hosting) | Account, User Content, outputs, metadata | Singapore |
| **RevenueCat** | Purchase/entitlement management | Purchase identifiers, app user ID | United States |
| **Apple** | App Store in-app purchases | Purchase transaction data | United States / your region |
| **Stripe** | Web payment processing | Payment, transaction data (card data handled by Stripe, not us) | United States / your region |
| **Alibaba Cloud Model Studio (Bailian)** | AI try-on **image** generation | The images and parameters needed to fulfil your request | International region (outside mainland China) |
| **Kuaishou Kling AI** | AI try-on **video** generation | The images and parameters needed to fulfil your request | International region (outside mainland China) |
| **BytePlus / Volcengine (Seedance)** | AI **video** generation (fallback) | The images and parameters needed to fulfil your request | International region (outside mainland China) |
| Professional advisors, authorities | Legal/compliance | As required | As applicable |

Your images are transmitted to the AI generation provider **only** to produce the
result you request, via short-lived signed URLs where applicable. We require these
vendors not to use your content for their own purposes and not to train their
models on it.

We may also disclose data in connection with a merger, acquisition, or asset sale,
subject to this Policy.

---

## 9. International data transfers

We and our vendors may process your personal data in countries other than your own,
including Singapore and the United States, and via the AI generation providers
listed above. Where we transfer personal data out of the EEA/UK, Korea, Japan, or
other regulated jurisdictions, we rely on appropriate safeguards, which may
include:

- the European Commission's **Standard Contractual Clauses (SCCs)** and the **UK
  International Data Transfer Addendum**;
- your **explicit consent** to the transfer (in particular for sensitive data such
  as your photos), where consent is the applicable mechanism (e.g., Korea PIPA,
  Japan APPI cross-border transfer); and/or
- other lawful transfer mechanisms recognised in your jurisdiction.

You may request a copy of the relevant safeguards at dugu7008009@gmail.com.

---

## 10. Your rights and how to exercise them

You can **access, export, correct, delete, restrict, or object** to processing of
your data directly in the app (Profile → Privacy / Account), or by emailing
dugu7008009@gmail.com. We provide self-service tools that implement:

- **Access / export** of your data (machine-readable export);
- **Deletion** ("right to be forgotten"), which removes your photos and account
  data;
- **Restriction** of processing; and
- **Objection** to processing, including objection to automated processing.

We respond within the timeframes required by applicable law (generally within 30
days; extendable where permitted). We will not discriminate against you for
exercising your rights.

### 10.1 EEA / UK (GDPR / UK GDPR)
You have the rights to access (Art. 15), rectification (Art. 16), erasure (Art.
17), restriction (Art. 18), data portability (Art. 20), objection (Art. 21), and
to withdraw consent at any time (Art. 7(3)). You also have the right to lodge a
complaint with your supervisory authority. We have not yet appointed an EU/UK
representative under Art. 27; one will be designated before active marketing to EEA/UK
users.

### 10.2 United States — California (CCPA/CPRA) and other states
You have the right to **know/access**, **delete**, **correct**, and to **opt out of
the "sale" or "sharing"** of personal information, and to **limit the use of
sensitive personal information**. **We do not sell or share** personal information
as those terms are defined under the CCPA/CPRA, and we use sensitive personal
information only to provide the Service you request. You may exercise these rights
as described above; you may use an authorised agent. We honor recognised opt-out
preference signals where required.

### 10.3 United States — Illinois (BIPA) and other biometric laws
To the extent your uploaded photos and any derived facial/body data constitute
**biometric identifiers or biometric information** under laws such as the Illinois
Biometric Information Privacy Act:

- we collect and process such data **only after you provide written consent** via
  the in-app consent flow;
- we **do not sell, lease, trade, or otherwise profit** from your biometric data;
- we disclose it only to the AI generation processors needed to fulfil your
  request; and
- we retain it only as long as needed to provide the Service and **destroy** it
  when the purpose is satisfied or within the period required by law, whichever is
  first, in line with our retention schedule (Section 7).

### 10.4 Japan (APPI)
We handle "personal information" and "special care-required personal information"
in accordance with the APPI, obtain your consent before acquiring sensitive data
and before cross-border transfers, and provide disclosure, correction, and
suspension of use on request. Details of foreign transfers are provided in Sections
8–9.

### 10.5 Korea (PIPA)
We obtain **separate, explicit consent** for (i) collection/use of personal data,
(ii) processing of sensitive data (your images), and (iii) cross-border transfer,
and we provide the statutory disclosures (recipient, purpose, items, retention,
country, and transfer method). You may withdraw consent, request access/correction/
deletion, and suspension of processing at any time.

### 10.6 Singapore (PDPA)
We collect, use, and disclose personal data with consent or as permitted by the
PDPA, and you may withdraw consent and request access/correction. Our Data
Protection Officer can be reached at dugu7008009@gmail.com.

### 10.7 Brazil (LGPD)
You have the rights under Arts. 18–20 LGPD, including confirmation of processing,
access, correction, anonymisation/deletion, portability, information about sharing,
and review of automated decisions. Our contact for LGPD matters is
dugu7008009@gmail.com.

### 10.8 Russia (152-FZ)
Where Federal Law No. 152-FZ applies, personal data of users located in Russia is
processed in accordance with applicable consent and data-localisation requirements.
Our current hosting region is Singapore; if you are a user in Russia, please contact
us at dugu7008009@gmail.com regarding your data.

---

## 11. Security

We use technical and organisational measures appropriate to the risk, including
encryption in transit, access controls, hashed credentials, short-lived signed
URLs for stored images, least-privilege access, and audit logging. No method of
transmission or storage is 100% secure; we cannot guarantee absolute security.

---

## 12. Cookies and similar technologies (website)

Our website may use strictly necessary cookies and, with your consent where
required, analytics/preferences cookies. You can manage non-essential cookies via
the cookie banner or your browser settings. The mobile app uses local storage and
device identifiers as described above rather than browser cookies.

---

## 13. Third-party links and stores

Purchases are processed by Apple and Stripe under their own terms and privacy
policies. We are not responsible for the privacy practices of third-party services
you access through links in the Service.

---

## 14. Changes to this Policy

We may update this Policy from time to time. We will update the "Last Updated" date
and, for material changes, provide a more prominent notice and, where required,
seek your renewed consent.

---

## 15. Contact us

- **Privacy / DPO:** dugu7008009@gmail.com
- **Support:** dugu7008009@gmail.com
- **Entity:** super fitting room (Hong Kong) Limited, Hong Kong SAR

---

*English is the governing language of this Privacy Policy. Translations are provided
for convenience; in case of any conflict, the English version prevails.*
