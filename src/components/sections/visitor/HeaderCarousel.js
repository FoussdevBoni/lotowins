/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import '../../../assets/css/style.css'
import '../../../assets/css/bootstrap.min.css'
import carouselImage1 from '../../../assets/img/carousel-1.jpg'
import '../../../assets/lib/animate/animate.css'
import '../../../assets/lib/animate/animate.min.css'
import '../../../assets/lib/owlcarousel/assets/owl.carousel.min.css'
import { useNavigate } from 'react-router-dom';
function HeaderCarousel(props) {
    const navigate = useNavigate()
    return (
 <div class="container-fluid position-relative p-0">
        <div id="header-carousel" class="carousel  slide carousel-fade" data-bs-ride="carousel">

            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img class="w-100" style={{maxHeight: '100vh' }} src={carouselImage1} alt="k"/>
                      <div className='bannar-caption  d-flex flex-column align-items-center justify-content-center'>
                             <div style={{width: 20, backgroundColor: 'red'}}></div>
                             <div class="p-3" style={{maxWidth: '900px', textAlign: 'center'}}>
                            <h1 class="display-1 text-white mb-md-4 animated zoomIn">Pariez et Gagnez au Loto en Ligne</h1>
                              <h5 class="text-white text-uppercase mb-3 animated slideInDown">Facile, sûr, et plein d'excitation!</h5>
                            <a  class="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft" data-bs-toggle="modal" data-bs-target="#registerModal" onClick={()=>{
                                navigate('/inscription')
                            }}>Inscription</a>
                            <a class="btn btn-outline-light py-md-3 px-md-5 animated slideInRight"  onClick={()=>{
                                navigate('/connexion')}}  data-bs-toggle="modal" data-bs-target="#loginModal" >Connexion</a>
                        </div>
                              <div style={{width: 20}}></div>

                       </div>

                    
                </div>
               
            </div>


            <button class="carousel-control-prev" type="button" data-bs-target="#header-carousel"
                data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#header-carousel"
                data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>




 <div class="modal fade" id="registerModal" tabindex="-1">
    <div class="modal-dialog modal-fullscreen">
        <div class="modal-content">
            <div class="modal-header border-0">
                <button type="button" class="btn bg-white btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body d-flex align-items-center justify-content-center">
                <form class="p-4 rounded bg-white"  id="register-form">
                    <h2 class="text-center mb-4">Inscription</h2>

                    <div class="mb-3">
                        <input type="text" class="form-control" id="identifiant" placeholder="Créer un identifiant" name="identifiant" />
                    </div>

                    <div class="mb-3">
                        <input type="email" class="form-control" id="register-email" placeholder="Entrez votre email" name="email" />
                    </div>

                    <div class="mb-3">
                        
                        <input type="password" class="form-control" id="motDePasse" placeholder="Entrez votre mot de passe" name="password" />
                    </div>

                    <div class="mb-3">
                        <select  class="form-control" id="pays"  name="pays">
                            <option value="Choisir un pays">
                                Choisir un pays
                            </option>
                            <option value="Bénin">Bénin</option>
                            <option value="Togo">Togo</option>
                        </select>

                    </div>

                    <div class="mb-3">
                         <div class="input-group">
                             <div class="input-group-append">
                <span class="input-group-text">
                   +229
                </span>
            </div>
                 <input type="tel" class="form-control" id="numeroTelephone" placeholder="Entrez votre numéro de téléphone" name="numeroTelephone" />
           
        </div>
                    </div>
                    <div class="mb-3">
                        <input type="number" class="form-control" id="age" placeholder="Entrez votre âge" name="age" />
                    </div>

                    <button type="submit" class="btn btn-primary">S'inscrire</button>
                </form>
            </div>
        </div>
    </div>
</div>



    </div>
    );
}

export default HeaderCarousel;