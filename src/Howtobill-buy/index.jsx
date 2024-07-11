// import React from 'react'
import { Link } from 'react-router-dom'
import "./index.scss"

function Buyandsell() {
  return (
    <div className="about-us">
   
    <Link to="/AboutUs" className="about-link">
    <h4>About Us</h4>
    </Link>
    <h1 className='abou'> Buy & Sell at Sotheby's</h1>
    <nav className="nav-tabs">
        <Link to="/bidding" className="nav-link active">BIDDING</Link>
        <Link to="/selling" className="nav-link">SELLING</Link>
        <Link to="/conditions-of-business" className="nav-link">CONDITIONS OF BUSINESS</Link>
        <Link to="/glossary" className="nav-link">GLOSSARY</Link>
      </nav>
    <div className='about-us__create'>1. Create your account</div>
    <p>In order to bid in an auction you’ll first need to <Link to="/register" className='about-us__register'> set up an account.</Link> Follow our step-by-step </p>
    <p>account creation guide to assist you in this process.</p>
    <p>If you already have an account, please <Link to="/login" className='about-us__login'>login</Link> and we will proceed with the auction</p>
    <p><Link to="/supporttobid" className='about-us__support'>What is needed to bid at auction?</Link></p>
    <p>Does Sotheby’s accept bids from organizations or only individuals?</p>
    <div className='about-us__Registerforauction' >2. Register for auction</div>
    <p>For a live auction, simply choose any auction and click “Register to bid” before the auction begins</p>
    <p>to receive your paddle number. You will then select how you would like to participate in the</p>
    <p>auction: in-person, over the phone, online, or by leaving absentee bids. Please note that for certain</p>
    <p>auctions, additional financial verification is required at least 24 hours before the sale.</p>
    <p>For an online-only auction, there is no separate registration process. Placing a bid automatically </p>
    <p>registers you for that auction.</p>
    <p><Link to="/how-to-bid" className='about-us__how-to-bid'>How can I bid in an auction?</Link></p>
    <p><Link to="/how-to-sale" className='about-us__see-work'>Can I see the work in person before a sale?</Link></p>
    <div className='about-us__PlaceyourBid' >3. Place your bids</div>
    <div className='live'>Live auctions</div>
    <div className='bid'>Bidding online</div>
    <p>Before the live portion of the auction, you may place maximum bids, which will either be executed</p>
    <p>immediately (Advance bids) or by the auctioneer during the live auction (Absentee bids).</p>
    <p>During the live auction, enter the online auction room and place your bid once the auctioneer has</p>
    <p>opened the lot. You can follow the bidding activity either by watching the page or by listening to</p>
    <p>the auctioneer.</p>
    <div className='person'>Bidding in person</div>
    <p>You will receive your paddle when checking in at the registration desk, and indicate to the</p>
    <p>auctioneer when you wish to place bids.</p>
    <div className='online'>Bidding online</div>
    <p>You will indicate your desired lots ahead of time, and a Sotheby’s representative will call you the</p>
    <p>day of the auction to execute bids on your behalf.</p>
    <div className='phone'>Bidding over the phone</div>
    <p>You will indicate your desired lots ahead of time, and a Sotheby’s representative will call you the</p>
    <p>day of the auction to execute bids on your behalf.</p>
    <div className='auctions'>Online-only auctions</div>
    <p>Once an auction is open for bidding, place your maximum bid on each of your desired lots. The</p>
    <p>platform will automatically place incremental bids on your behalf up to your maximum amount.</p>
    <p>Lots close in one minute increments and will be extended by two minutes if a bid is placed within</p>
    <p>the final minute before the lot’s scheduled closing time. Lots may extend for up to two hours to</p>
    <p>accommodate competitive bidding.</p>
    <div className='about-us__Payment'>4 Payment</div>
    <p>Your final amount due will include the hammer price, buyer’s premium, overhead premium, and</p>
    <p>local taxes. In certain locations, a re-sale royalty will be collected.</p>
    <p>If you are attending, the auction in person, you may pay for your items immediately following the</p>
    <p>auction. Otherwise, our Post-Sales Service team will send you an invoice and shipping quote.</p>
  </div>
  )
}

export default Buyandsell;
