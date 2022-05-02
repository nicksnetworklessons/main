import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import styled from "styled-components";


const truncate = (input, len) =>
  input.length > len ? `${input.substring(0, len)}...` : input;

export const StyledButton = styled.button`
  padding: 10px;
  border-radius: 50px;
  border: none;
  background-color: var(--secondary);
  padding: 10px;
  font-weight: bold;
  color: var(--secondary-text);
  width: 100px;
  cursor: pointer;
  box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const StyledRoundButton = styled.button`
  padding: 10px;
  border-radius: 100%;
  border: none;
  background-color: var(--primary);
  padding: 10px;
  font-weight: bold;
  font-size: 15px;
  color: var(--primary-text);
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const ResponsiveWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: stretched;
  align-items: stretched;
  width: 100%;
  @media (min-width: 767px) {
    flex-direction: row;
  }
`;

export const StyledLogo = styled.img`
  width: 200px;
  @media (min-width: 767px) {
    width: 300px;
  }
  transition: width 0.5s;
  transition: height 0.5s;
`;

export const StyledImg = styled.img`
  box-shadow: 0px 5px 11px 2px rgba(0, 0, 0, 0.7);
  border: 4px solid var(--secondary);
  background-color: var(--accent);
  border-radius: 100%;
  width: 200px;
  @media (min-width: 900px) {
    width: 250px;
  }
  @media (min-width: 1000px) {
    width: 300px;
  }
  transition: width 0.5s;
`;

export const StyledLink = styled.a`
  color: var(--secondary);
  text-decoration: none;
`;

function App() {

  const htmlhead = (
    <head>

      <meta charset="utf-8" />
      <base href="/" />
      <link rel="icon" href="../public/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <link rel="stylesheet" href="../public/config/theme.css" />
      <link rel="apple-touch-icon" href="../public/logo192.png" />
      <link rel="manifest" href="../public/manifest.json" />
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta name="description" content="" />
      <meta name="author" content="Skate'r" />
      <title>Skate'r</title>
      <link rel="icon" type="image/x-icon" href="../public/assets/favicon.ico" />
      <script src="https://use.fontawesome.com/releases/v6.1.0/js/all.js" crossorigin="anonymous"></script>
      <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" type="text/css" />
      <link href="https://fonts.googleapis.com/css?family=Lato:400,700,400italic,700italic" rel="stylesheet"
        type="text/css" />
      <link href="../public/css/styles.css" rel="stylesheet" />
    </head>
  );

  const htmlbodyfirst = (

    <body id="page-top">
      <nav class="navbar navbar-expand-lg bg-secondary text-uppercase fixed-top" id="mainNav">
        <div class="container">
          <a class="navbar-brand" href="#page-top">Skate'r</a>
          <button class="navbar-toggler text-uppercase font-weight-bold bg-primary text-white rounded" type="button"
            data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive"
            aria-expanded="false" aria-label="Toggle navigation">
            Menu
            <i class="fas fa-bars"></i>
          </button>
          <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item mx-0 mx-lg-1"><a class="nav-link py-3 px-0 px-lg-3 rounded"
                href="#skater">About</a>
              </li>
              <li class="nav-item mx-0 mx-lg-1"><a class="nav-link py-3 px-0 px-lg-3 rounded"
                href="#portfolio">Team</a></li>
              <li class="nav-item mx-0 mx-lg-1"><a class="nav-link py-3 px-0 px-lg-3 rounded"
                href="#mint-tab">Mint</a>
              </li>
              <li class="nav-item mx-0 mx-lg-1"><a class="nav-link py-3 px-0 px-lg-3 rounded"
                href="https://skater.gitbook.io/skaternft/" target="_blank" rel="noopener">WhitePaper</a>
              </li>
              <li class="nav-item mx-0 mx-lg-1"><a class="btn btn-outline-light btn-social mx-1"
                href="https://twitter.com/Skater_NFTs" target="_blank" rel="noopener"><i
                  class="fab fa-fw fa-twitter"></i></a></li>
              <li class="nav-item mx-0 mx-lg-1"><a class="btn btn-outline-light btn-social mx-1"
                href="https://discord.gg/arxwFWbNgk" target="_blank" rel="noopener"><i
                  class="fab fa-fw fa-discord"></i></a></li>
            </ul>
          </div>
        </div>
      </nav>


      <header id="htmlbackground" class="masthead bg-primary text-white text-center">
        <div class="container d-flex align-items-center flex-column">
          <div class="divider-custom divider-light"> </div>
          <div class="divider-custom divider-light"> </div>
          <div class="divider-custom divider-light"> </div>
          <div class="divider-custom divider-light"> </div>
          <div class="divider-custom divider-light"> </div>
          <div class="divider-custom divider-light"> </div>
          <div class="divider-custom divider-light"> </div>
          <div class="divider-custom divider-light"> </div>
          <div class="divider-custom divider-light"> </div>
          <div class="divider-custom divider-light"> </div>
          <div class="divider-custom divider-light"> </div>
          <div class="divider-custom divider-light"> </div>
          <div class="divider-custom divider-light"> </div>
          <div class="divider-custom divider-light"> </div>
          <div class="divider-custom divider-light"> </div>
          <div class="divider-custom divider-light"> </div>
        </div>
      </header>

      <section class="page-section portfolio" id="skater">
        <div class="container">
          <h2 class="page-section-heading text-center text-uppercase text-secondary mb-0">About Us</h2>
          <div class="divider-custom">
            <div class="divider-custom-line"></div>
            <div class="divider-custom-icon"><i class="fas fa-star"></i></div>
            <div class="divider-custom-line"></div>
          </div>
          <div class="divider-custom divider-light"> </div>
          <div class="divider-custom divider-light"> </div>
          <div class="row justify-content-center">
            <div class="col-md-6 col-lg-4 mb-5">
              <div class="portfolio-item mx-auto" data-bs-toggle="modal" data-bs-target="#skaterModal1">
                <div
                  class="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                  <div class="portfolio-item-caption-content text-center text-white"><i
                    class="fas fa-plus fa-3x"></i></div>
                </div>
                <img class="img-fluid" src="assets/img/skater/0.png" width={400} height={400} alt="Art" />
              </div>
            </div>
            <div class="col-md-6 col-lg-4 mb-5">
              <div class="portfolio-item mx-auto" data-bs-toggle="modal" data-bs-target="#skaterModal2">
                <div
                  class="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                  <div class="portfolio-item-caption-content text-center text-white"><i
                    class="fas fa-plus fa-3x"></i></div>
                </div>
                <img class="img-fluid" src="assets/img/skater/1.png" width={400} height={400} alt="Skate2Earn" />
              </div>
            </div>
            <div class="col-md-6 col-lg-4 mb-5">
              <div class="portfolio-item mx-auto" data-bs-toggle="modal" data-bs-target="#skaterModal3">
                <div
                  class="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                  <div class="portfolio-item-caption-content text-center text-white"><i
                    class="fas fa-plus fa-3x"></i></div>
                </div>
                <img class="img-fluid" src="assets/img/skater/2.png" width={400} height={400} alt="Vision" />
              </div>
            </div>
            <div class="col-md-6 col-lg-4 mb-5">
              <div class="portfolio-item mx-auto" data-bs-toggle="modal" data-bs-target="#skaterModal4">
                <div
                  class="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                  <div class="portfolio-item-caption-content text-center text-white"><i
                    class="fas fa-plus fa-3x"></i></div>
                </div>
                <img class="img-fluid" src="assets/img/skater/3.png" width={400} height={400} alt="Roadmap" />
              </div>
            </div>
            <div class="col-md-6 col-lg-4 mb-5">
              <div class="portfolio-item mx-auto" data-bs-toggle="modal" data-bs-target="#skaterModal5">
                <div
                  class="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                  <div class="portfolio-item-caption-content text-center text-white"><i
                    class="fas fa-plus fa-3x"></i></div>
                </div>
                <img class="img-fluid" src="assets/img/skater/4.png" width={400} height={400} alt="MintImg" />
              </div>
            </div>
            <div class="col-md-6 col-lg-4 mb-5">
              <div class="portfolio-item mx-auto" data-bs-toggle="modal" data-bs-target="#skaterModal6">
                <div
                  class="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                  <div class="portfolio-item-caption-content text-center text-white"><i
                    class="fas fa-plus fa-3x"></i></div>
                </div>
                <img class="img-fluid" src="assets/img/skater/5.png" width={400} height={400} alt="WhitePaperimg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="page-section portfolio" id="portfolio">
        <div class="container">
          <h2 class="page-section-heading text-center text-uppercase text-secondary mb-0">The Team</h2>
          <div class="divider-custom">
            <div class="divider-custom-line"></div>
            <div class="divider-custom-icon"><i class="fas fa-star"></i></div>
            <div class="divider-custom-line"></div>
          </div>
          <div class="row justify-content-center">
            <div class="divider-custom divider-light"> </div>
            <div class="col-md-6 col-lg-4 mb-5">
              <div class="portfolio-item mx-auto" data-bs-toggle="modal" data-bs-target="#portfolioModal1">
                <div
                  class="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                  <div class="portfolio-item-caption-content text-center text-white"><i
                    class="fas fa-plus fa-3x"></i></div>
                </div>
                <img class="img-fluid" src="assets/img/portfolio/nick.jpg" width={400} height={400} alt="Nick Pasqualetti" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </body >
  )
  const htmlbodysecond = (
    <body>
      <div class="copyright py-4 text-center text-white">
        <footer class="footer text-center">
          <div class="container">
            <div class="row">
              <div class="col-lg-4 mb-5 mb-lg-0">
                <h4 class="text-uppercase mb-4">About</h4>
                <p class="lead mb-0">
                  Visit our about page <a href="https://skater.gitbook.io/skaternft" target="_blank"
                    rel="noopener">here</a>.
                </p>
                <div class="divider-custom divider-light"> </div>
                <h4 class="text-uppercase mb-4"><a href="https://raritysniper.com/nft-drops-calendar">NFT Drops</a></h4>
              </div>
              <div class="col-lg-4 mb-5 mb-lg-0">
                <h4 class="text-uppercase mb-4">Around the Web</h4>
                <a class="btn btn-outline-light btn-social mx-1" href="https://twitter.com/Skater_NFTs"
                  target="_blank" rel="noopener"><i class="fab fa-fw fa-twitter"></i></a>
                <a class="btn btn-outline-light btn-social mx-1" href="https://discord.gg/arxwFWbNgk"
                  target="_blank" rel="noopener"><i class="fab fa-fw fa-discord"></i></a>
                <a class="btn btn-outline-light btn-social mx-1" href="https://skaternft.org" target="_blank"
                  rel="noopener"><i class="fab fa-fw fa-dribbble"></i></a>
              </div>
              <div class="col-lg-4">
                <h4 class="text-uppercase mb-4">White Paper</h4>
                <p class="lead mb-0">
                  Want to know more about our project?
                  <br />Visit our White Paper <a href="https://skater.gitbook.io/skaternft/" target="_blank"
                    rel="noopener">here</a>.
                </p>
              </div>
            </div>
          </div>
        </footer>
        <div class="container"><small>Copyright &copy; Skate'r 2022</small></div>
        <div class="divider-custom divider-light"> </div>
      </div>
      <div class="portfolio-modal modal fade" id="portfolioModal1" tabindex="-1" aria-labelledby="portfolioModal1"
        aria-hidden="true">
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header border-0"><button class="btn-close" type="button" data-bs-dismiss="modal"
              aria-label="Close"></button></div>
            <div class="modal-body text-center pb-5">
              <div class="container">
                <div class="row justify-content-center">
                  <div class="col-lg-8">
                    <h2 class="portfolio-modal-title text-secondary text-uppercase mb-0">Nicholas Pasqualetti
                    </h2>
                    <div class="divider-custom">
                      <div class="divider-custom-line"></div>
                      <div class="divider-custom-icon"><i class="fas fa-star"></i></div>
                      <div class="divider-custom-line"></div>
                    </div>
                    <img class="img-fluid rounded mb-5" src="assets/img/portfolio/nick.jpg" width={400} height={400} alt="..." />
                    <p class="mb-4">0x_Technet (Nicholas Pasqualetti) started his crypto journey in 2017
                      like many others
                      and is currently working on new creative ideas to expand the Skate'r application and
                      lifestyle. He has
                      had a great career in and out of the world of cryptocurrencies. His background is in
                      Network and
                      Systems Engineering, and has experience working at prestigious law firms, government
                      agencies, and
                      major automobile manufacturers.</p>
                    <button class="btn btn-primary" data-bs-dismiss="modal">
                      <i class="fas fa-xmark fa-fw"></i>
                      Close Window
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="portfolio-modal modal fade" id="skaterModal1" tabindex="-1" aria-labelledby="skaterModal1"
        aria-hidden="true">
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header border-0"><button class="btn-close" type="button" data-bs-dismiss="modal"
              aria-label="Close"></button></div>
            <div class="modal-body text-center pb-5">
              <div class="container">
                <div class="row justify-content-center">
                  <div class="col-lg-8">
                    <h2 class="portfolio-modal-title text-secondary text-uppercase mb-0">Art
                    </h2>
                    <div class="divider-custom">
                      <div class="divider-custom-line"></div>
                      <div class="divider-custom-icon"><i class="fas fa-star"></i></div>
                      <div class="divider-custom-line"></div>
                    </div>
                    <p class="mb-4">You can visit our Art here: <a href="https://opensea.io/collection/skater-nft-club">Opensea</a>
                      <div class="divider-custom divider-light"> </div>
                      <p>SKATER NFT: <a href="https://opensea.io/collection/skater-nft-club">Skate'r NFT Club</a></p>
                      <p>SKATER ERC20 Token: TBA June, 2022</p>
                      <p>SKATER DAO TOKEN: TBA June, 2022</p>
                    </p>
                    <button class="btn btn-primary" data-bs-dismiss="modal">
                      <i class="fas fa-xmark fa-fw"></i>
                      Close Window
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div class="portfolio-modal modal fade" id="skaterModal2" tabindex="-1" aria-labelledby="skaterModal2"
        aria-hidden="true">
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header border-0"><button class="btn-close" type="button" data-bs-dismiss="modal"
              aria-label="Close"></button></div>
            <div class="modal-body text-center pb-5">
              <div class="container">
                <div class="row justify-content-center">
                  <div class="col-lg-8">
                    <h2 class="portfolio-modal-title text-secondary text-uppercase mb-0">Skate2Earn
                    </h2>
                    <div class="divider-custom">
                      <div class="divider-custom-line"></div>
                      <div class="divider-custom-icon"><i class="fas fa-star"></i></div>
                      <div class="divider-custom-line"></div>
                    </div>
                    <p class="mb-4">Skate2Earn is a powerful skateboarding tracker that allows you to earn cryptocurrency for skateboarding. We pay out Skate'r Tokens for every mile you skateboard. This is the application to give you that extra incentive to get out and skateboard!
                      <div class="divider-custom divider-light"> </div>
                      <p>SKATER NFT: <a href="https://opensea.io/collection/skater-nft-club">Skate'r NFT Club</a></p>
                      <p>SKATER ERC20 Token: TBA June, 2022</p>
                      <p>SKATER DAO TOKEN: TBA June, 2022</p>
                    </p>
                    <button class="btn btn-primary" data-bs-dismiss="modal">
                      <i class="fas fa-xmark fa-fw"></i>
                      Close Window
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="portfolio-modal modal fade" id="skaterModal3" tabindex="-1" aria-labelledby="skaterModal3"
        aria-hidden="true">
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header border-0"><button class="btn-close" type="button" data-bs-dismiss="modal"
              aria-label="Close"></button></div>
            <div class="modal-body text-center pb-5">
              <div class="container">
                <div class="row justify-content-center">
                  <div class="col-lg-8">
                    <h2 class="portfolio-modal-title text-secondary text-uppercase mb-0">Vision
                    </h2>
                    <div class="divider-custom">
                      <div class="divider-custom-line"></div>
                      <div class="divider-custom-icon"><i class="fas fa-star"></i></div>
                      <div class="divider-custom-line"></div>
                    </div>
                    <p class="mb-4">Skate'r (SKATER) is a lifestyle NFT built with Social-Fi elements to inspire the next generation of skaters while helping local skating communities all around the world. By joining our community, you will get exclusive access to our Skate2Earn application!
                      <div class="divider-custom divider-light"> </div>
                      <p>SKATER NFT: <a href="https://opensea.io/collection/skater-nft-club">Skate'r NFT Club</a></p>
                      <p>SKATER ERC20 Token: TBA June, 2022</p>
                      <p>SKATER DAO TOKEN: TBA June, 2022</p></p>
                    <button class="btn btn-primary" data-bs-dismiss="modal">
                      <i class="fas fa-xmark fa-fw"></i>
                      Close Window
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="portfolio-modal modal fade" id="skaterModal4" tabindex="-1" aria-labelledby="skaterModal4"
        aria-hidden="true">
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header border-0"><button class="btn-close" type="button" data-bs-dismiss="modal"
              aria-label="Close"></button></div>
            <div class="modal-body text-center pb-5">
              <div class="container">
                <div class="row justify-content-center">
                  <div class="col-lg-8">
                    <h2 class="portfolio-modal-title text-secondary text-uppercase mb-0">Roadmap
                    </h2>
                    <div class="divider-custom">
                      <div class="divider-custom-line"></div>
                      <div class="divider-custom-icon"><i class="fas fa-star"></i></div>
                      <div class="divider-custom-line"></div>
                    </div>
                    <p class="mb-4">You can visit our roadmap here: <a href="https://skater.gitbook.io/skaternft/fundamentals/roadmap">Roadmap</a>
                      <div class="divider-custom divider-light"> </div>
                      <p>SKATER NFT: <a href="https://opensea.io/collection/skater-nft-club">Skate'r NFT Club</a></p>
                      <p>SKATER ERC20 Token: TBA June, 2022</p>
                      <p>SKATER DAO TOKEN: TBA June, 2022</p></p>
                    <button class="btn btn-primary" data-bs-dismiss="modal">
                      <i class="fas fa-xmark fa-fw"></i>
                      Close Window
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="portfolio-modal modal fade" id="skaterModal5" tabindex="-1" aria-labelledby="skaterModal5"
        aria-hidden="true">
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header border-0"><button class="btn-close" type="button" data-bs-dismiss="modal"
              aria-label="Close"></button></div>
            <div class="modal-body text-center pb-5">
              <div class="container">
                <div class="row justify-content-center">
                  <div class="col-lg-8">
                    <h2 class="portfolio-modal-title text-secondary text-uppercase mb-0">Mint
                    </h2>
                    <div class="divider-custom">
                      <div class="divider-custom-line"></div>
                      <div class="divider-custom-icon"><i class="fas fa-star"></i></div>
                      <div class="divider-custom-line"></div>
                    </div>
                    <p class="mb-4">To MINT your Skate'r NFT after launch, follow these instructions:
                      <div class="divider-custom divider-light"> </div>
                      <div> </div>
                      1. Browse to <a href="https://skaternft.org">https://skaternft.org</a>
                      <div> </div>
                      2. Press the <a href="#mint-tab">MINT</a> tab on the navigation pane
                      <div> </div>
                      3. Press Connect
                      <div> </div>
                      4. Adjust to the desired amount of NFTs
                      <div> </div>
                      5. Press BUY and follow the Metamask prompts
                      <div class="divider-custom divider-light"> </div>
                      <p>SKATER NFT: <a href="https://opensea.io/collection/skater-nft-club">Skate'r NFT Club</a></p>
                      <p>SKATER ERC20 Token: TBA June, 2022</p>
                      <p>SKATER DAO TOKEN: TBA June, 2022</p></p>
                    <button class="btn btn-primary" data-bs-dismiss="modal">
                      <i class="fas fa-xmark fa-fw"></i>
                      Close Window
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="portfolio-modal modal fade" id="skaterModal6" tabindex="-1" aria-labelledby="skaterModal6"
        aria-hidden="true">
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header border-0"><button class="btn-close" type="button" data-bs-dismiss="modal"
              aria-label="Close"></button></div>
            <div class="modal-body text-center pb-5">
              <div class="container">
                <div class="row justify-content-center">
                  <div class="col-lg-8">
                    <h2 class="portfolio-modal-title text-secondary text-uppercase mb-0">Whitepaper
                    </h2>
                    <div class="divider-custom">
                      <div class="divider-custom-line"></div>
                      <div class="divider-custom-icon"><i class="fas fa-star"></i></div>
                      <div class="divider-custom-line"></div>
                    </div>
                    <p class="mb-4">You can visit our Whitepaper here: <a href="https://skater.gitbook.io/skaternft/">Whitepaper</a>
                      <div class="divider-custom divider-light"> </div>
                      <p>SKATER NFT: <a href="https://opensea.io/collection/skater-nft-club">Skate'r NFT Club</a></p>
                      <p>SKATER ERC20 Token: TBA June, 2022</p>
                      <p>SKATER DAO TOKEN: TBA June, 2022</p></p>
                    <button class="btn btn-primary" data-bs-dismiss="modal">
                      <i class="fas fa-xmark fa-fw"></i>
                      Close Window
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
      <script src="js/scripts.js"></script>
    </body>
  )

  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [claimingNft, setClaimingNft] = useState(false);
  const [feedback, setFeedback] = useState(`Click buy to mint your NFT.`);
  const [mintAmount, setMintAmount] = useState(1);
  const [CONFIG, SET_CONFIG] = useState({
    CONTRACT_ADDRESS: "",
    SCAN_LINK: "",
    NETWORK: {
      NAME: "",
      SYMBOL: "",
      ID: 0,
    },
    NFT_NAME: "",
    SYMBOL: "",
    MAX_SUPPLY: 1,
    WEI_COST: 0,
    DISPLAY_COST: 0,
    GAS_LIMIT: 0,
    MARKETPLACE: "",
    MARKETPLACE_LINK: "",
    SHOW_BACKGROUND: false,
  });

  const claimNFTs = () => {
    let cost = CONFIG.WEI_COST;
    let gasLimit = CONFIG.GAS_LIMIT;
    let totalCostWei = String(cost * mintAmount);
    let totalGasLimit = String(gasLimit * mintAmount);
    console.log("Cost: ", totalCostWei);
    console.log("Gas limit: ", totalGasLimit);
    setFeedback(`Minting your ${CONFIG.NFT_NAME}...`);
    setClaimingNft(true);
    blockchain.smartContract.methods
      .mint(mintAmount)
      .send({
        gasLimit: String(totalGasLimit),
        to: CONFIG.CONTRACT_ADDRESS,
        from: blockchain.account,
        value: totalCostWei,
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, something went wrong please try again later.");
        setClaimingNft(false);
      })
      .then((receipt) => {
        console.log(receipt);
        setFeedback(
          `WOW, the ${CONFIG.NFT_NAME} is yours! go visit Opensea.io to view it.`
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };

  const decrementMintAmount = () => {
    let newMintAmount = mintAmount - 1;
    if (newMintAmount < 1) {
      newMintAmount = 1;
    }
    setMintAmount(newMintAmount);
  };

  const incrementMintAmount = () => {
    let newMintAmount = mintAmount + 1;
    if (newMintAmount > 10) {
      newMintAmount = 10;
    }
    setMintAmount(newMintAmount);
  };

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };

  const getConfig = async () => {
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const config = await configResponse.json();
    SET_CONFIG(config);
  };

  useEffect(() => {
    getConfig();
  }, []);

  useEffect(() => {
    getData();
  }, [blockchain.account]);

  return (

    <s.Screen>
      {htmlhead}
      {htmlbodyfirst}
      <div class="divider-custom divider-light"> </div>
      <body id="mint-tab"></body>
      <div class="divider-custom divider-light"> </div>
      <s.Container
        flex={1}
        ai={"center"}
        style={{ padding: 24, backgroundColor: "var(--primary)" }}
        image={CONFIG.SHOW_BACKGROUND ? "/config/images/bg.png" : null}
      >
        <StyledLogo alt={"logo"} src={"/config/images/logo.png"} />
        <s.SpacerSmall />
        <ResponsiveWrapper flex={1} style={{ padding: 24 }} test>
          <s.Container flex={1} jc={"center"} ai={"center"}>
            <StyledImg alt={"nft"} src={"/config/images/nft.gif"} />
          </s.Container>
          <s.SpacerLarge />
          <s.Container
            flex={2}
            jc={"center"}
            ai={"center"}
            style={{
              backgroundColor: "var(--accent)",
              padding: 24,
              borderRadius: 24,
              border: "4px solid var(--secondary)",
              boxShadow: "0px 5px 11px 2px rgba(0,0,0,0.7)",
            }}
          >
            <s.TextTitle
              style={{
                textAlign: "center",
                fontSize: 50,
                fontWeight: "bold",
                color: "var(--accent-text)",
              }}
            >

              <div class="divider-custom divider-light"> </div>
              <div class="divider-custom divider-light"> </div>

              <s.SpacerSmall />
              <s.TextDescription
                style={{ textAlign: "center", color: "var(--accent-text)" }}
              >
                Connect your wallet (Metamask Only) to see the Total Supply!
              </s.TextDescription>
              <s.SpacerSmall />
              {data.totalSupply} / {CONFIG.MAX_SUPPLY}
            </s.TextTitle>
            <s.TextDescription
              style={{
                textAlign: "center",
                color: "var(--primary-text)",
              }}
            >
              <StyledLink target={"_blank"} href={CONFIG.SCAN_LINK}>
                {truncate(CONFIG.CONTRACT_ADDRESS, 15)}
              </StyledLink>
            </s.TextDescription>
            <s.SpacerSmall />
            {Number(data.totalSupply) >= CONFIG.MAX_SUPPLY ? (
              <>
                <s.TextTitle
                  style={{ textAlign: "center", color: "var(--accent-text)" }}
                >
                  The sale has ended.
                </s.TextTitle>
                <s.TextDescription
                  style={{ textAlign: "center", color: "var(--accent-text)" }}
                >
                  You can still find {CONFIG.NFT_NAME} on
                </s.TextDescription>
                <s.SpacerSmall />
                <StyledLink target={"_blank"} href={CONFIG.MARKETPLACE_LINK}>
                  {CONFIG.MARKETPLACE}
                </StyledLink>
              </>
            ) : (
              <>
                <s.TextTitle
                  style={{ textAlign: "center", color: "var(--accent-text)" }}
                >
                  1 {CONFIG.SYMBOL} costs {CONFIG.DISPLAY_COST}{" "}
                  {CONFIG.NETWORK.SYMBOL}.
                </s.TextTitle>
                <s.SpacerXSmall />
                <s.TextDescription
                  style={{ textAlign: "center", color: "var(--accent-text)" }}
                >
                  Excluding gas fees.
                </s.TextDescription>
                <s.SpacerSmall />
                {blockchain.account === "" ||
                  blockchain.smartContract === null ? (
                  <s.Container ai={"center"} jc={"center"}>
                    <s.TextDescription
                      style={{
                        textAlign: "center",
                        color: "var(--accent-text)",
                      }}
                    >
                      Connect to the {CONFIG.NETWORK.NAME} network
                    </s.TextDescription>
                    <s.SpacerSmall />
                    <StyledButton
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(connect());
                        getData();
                      }}
                    >
                      CONNECT
                    </StyledButton>
                    {blockchain.errorMsg !== "" ? (
                      <>
                        <s.SpacerSmall />
                        <s.TextDescription
                          style={{
                            textAlign: "center",
                            color: "var(--accent-text)",
                          }}
                        >
                          {blockchain.errorMsg}
                        </s.TextDescription>
                      </>
                    ) : null}
                  </s.Container>
                ) : (
                  <>
                    <s.TextDescription
                      style={{
                        textAlign: "center",
                        color: "var(--accent-text)",
                      }}
                    >
                      {feedback}
                    </s.TextDescription>
                    <s.SpacerMedium />
                    <s.Container ai={"center"} jc={"center"} fd={"row"}>
                      <StyledRoundButton
                        style={{ lineHeight: 0.4 }}
                        disabled={claimingNft ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          decrementMintAmount();
                        }}
                      >
                        -
                      </StyledRoundButton>
                      <s.SpacerMedium />
                      <s.TextDescription
                        style={{
                          textAlign: "center",
                          color: "var(--accent-text)",
                        }}
                      >
                        {mintAmount}
                      </s.TextDescription>
                      <s.SpacerMedium />
                      <StyledRoundButton
                        disabled={claimingNft ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          incrementMintAmount();
                        }}
                      >
                        +
                      </StyledRoundButton>
                    </s.Container>
                    <s.SpacerSmall />
                    <s.Container ai={"center"} jc={"center"} fd={"row"}>
                      <StyledButton
                        disabled={claimingNft ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          claimNFTs();
                          getData();
                        }}
                      >
                        {claimingNft ? "BUSY" : "BUY"}
                      </StyledButton>
                    </s.Container>
                  </>
                )}
              </>
            )}
            <s.SpacerMedium />
            <div class="divider-custom divider-light"> </div>
          </s.Container>
          <s.SpacerLarge />
          <s.Container flex={1} jc={"center"} ai={"center"}>
            <StyledImg
              alt={"nft"}
              src={"/config/images/nft-inverse.gif"}
              style={{ transform: "scaleX(-1)" }}
            />
          </s.Container>
        </ResponsiveWrapper>
        <div class="divider-custom divider-light"> </div>
        <s.SpacerMedium />
        <s.Container jc={"center"} ai={"center"} style={{ width: "70%" }}>
          <s.TextDescription
            style={{
              textAlign: "center",
              color: "var(--primary-text)",
            }}
          >
            Please make sure you are connected to the right network (
            {CONFIG.NETWORK.NAME} Mainnet) and the correct address. Please note:
            Once you make the purchase, you cannot undo this action.
          </s.TextDescription>
          <s.SpacerSmall />
          <s.TextDescription
            style={{
              textAlign: "center",
              color: "var(--primary-text)",
            }}
          >
            We have set the gas limit to {CONFIG.GAS_LIMIT} for the contract to
            successfully mint your NFT. We recommend that you don't lower the
            gas limit.
          </s.TextDescription>
        </s.Container>
      </s.Container>
      <div class="divider-custom divider-light"> </div>
      <div class="divider-custom divider-light"> </div>
      {htmlbodysecond}
    </s.Screen>
  );
}

export default App;
