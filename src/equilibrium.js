// permet de créer une matrice de taille : taille1*taille2 et de la remplir avec //la fonction prompt

function creer_matrice(taille1,taille2) {

    var matrice= new Array();

    for (var i=0; i<taille1; i++) {
        for (var j=0; j<taille2; j++) {
            if (!matrice[i]) matrice[i] = new Array();
            var case_courante = prompt('Valeur de la case : ' + i + '|' + j);
            matrice[i][j] = case_courante;
        }
    }
    return matrice;
}
function creer_vecteur(taille)
{
    var vecteur=new Array();
    for(var i=0;i<taille;i++)
    {
        vecteur[i] = prompt('Valeur de la case : ' + i);

    }
    return vecteur;
}
// permet d'afficher un vecteur
function voir_vecteur(vecteur)
{
    var chaine ="";
    for(var i=0;i<vecteur.length;i++)
    {
        chaine=chaine+"                   "+vecteur[i];
    }
    alert(chaine);
}
// permet d'afficher une matrice
function voir_matrice(matrice,taille1,taille2)
{
    var chaine="";
    for(var i=0;i<taille1;i++)
    {
        for(var j=0;j<taille2;j++)
        {

            chaine=chaine+"           "+matrice[i][j]+" ";

        }
        chaine=chaine+"\n";
    }

    alert(chaine);
}
function Substract_vector(vec1,vec2)
{
    var vec_final= new Array();
    for(var i=0;i<vec1.length;i++)
    {
        vec_final[i]=vec1[i]-vec2[i];

    }
    return vec_final;
}
function multi_vecteur(vec1,vec2)
{
    var vec_final=[];
    for(var i=0;i<vec1.length;i++)
    {
        vec_final[i]=vec1[i]*vec2[i];
    }
    return vec_final;
}
/* permet de faire une multiplication entre deux matrice != a une multiplication matricielle. le nombre ij de la première matrice sera simplement multiplié par le nombre ij de la deuxième matrice. Cette fonction est utilisé une fois. Avec le model et les concentration de chaque composé afin d'obtenir les concentration total de chaque espèces pures.*/

function multi_matrice(tab1,tab2,dim1,dim2)
{
    var table_result=new Array();
    for(var i=0;i<dim1 ;i++)
    {
        for(var j =0;j<dim2;j++)
        {
            if (!table_result[i]) table_result[i] = new Array();
            table_result[i][j]= tab1[i][j]*tab2[i][j];
        }
    }
    return table_result;
}
/* permet de faire la puissance entre deux matrices. Le nobre ij de la première matrice sera à la puissance ij de la deuxième matrice. Cette fonction sera utilisé pour mettre les concentration devinés à ls puissance le model afin d'obtenir le vecteur qui pourra nous servir à calculer les concentrations de chaque composés*/
function puissance_matrice(tab1,tab2,dim1,dim2)
{
    var table_result=new Array();
    for(var i=0;i<dim1 ;i++)
    {
        for(var j =0;j<dim2;j++)
        {
            if (!table_result[i]) table_result[i] = new Array();
            table_result[i][j]= Math.pow(tab1[i][j],tab2[i][j]);
        }
    }
    return table_result;
}
function row_to_matrice(vecteur,dim_vec,nombre_composant)
{
    var matrice = new Array();
    for(var i=0;i<dim_vec;i++)
    {
        for(var j=0;j<nombre_composant;j++)
        {
            if(!matrice[i])matrice[i]=new Array();
            matrice[i][j]=vecteur[i];

        }

    }
    return matrice;

}

/*permet de transformer une matrice en vecteur. les composées d'une même colonnes sont multiplier entre eux afin d'obtenir le nombre de la colonne du vecteur */
function matrice_to_row(matrice,number_compound,number_species)
{
    var row=[];
    for(var i=0;i<number_compound;i++)
    {
        row[i]=1;
        for(var j=0;j<number_species;j++)
        {
            row[i]=row[i]*matrice[j][i];
        }
    }

    return row;
}
function extract_row(matrice,number_row,number_compound)
{
    var row=[];
    for(var i=0;i<number_compound;i++)
    {
        row[i]=matrice[number_row][i];
    }
    return row;
}
// permet de calculer le jacobian star qui sera utile pour la minimisation
function Jacobian_star(model,conc_compose,nombre_species,nombre_compound)
{
    var jacobian_s=new Array();
    for(var i=0; i< nombre_species;i++)
    {
        for(var j=0;j<nombre_species;j++)
        {
            if (!jacobian_s[i]) jacobian_s[i] = new Array();
            var row1_model = extract_row(model,i,nombre_compound);
            var row2_model = extract_row(model,j,nombre_compound);
            var multi_model = multi_vecteur(row1_model,row2_model,nombre_compound);
            jacobian_s[i][j]= sum_vector(multi_vecteur(multi_model,conc_compose));
        }
    }
    return jacobian_s;
}

/*permet de créer une matrice dont les composante du vecteur se trouve en diagonal de la matrice, toute les autres composantes seront égal à zéro*/
function diag_matrice(vec_compose)
{
    matrice_diag= new Array();
    for(var i =0; i<vec_compose.length;i++)
    {
        for(var j=0;j<vec_compose.length;j++)
        {
            if(!matrice_diag[i])matrice_diag[i]=new Array();
            if(i==j)matrice_diag[i][j]=vec_compose[i];
            else matrice_diag[i][j]=0;
        }
    }
    return matrice_diag;
}
function extract_submatrice(matrice,dim,delete_i,delete_j)
{
    var k=0;
    var l=0;
    var dim_sub=dim-1;
    var sub_matrice= new Array();
    sub_matrice[0]= new Array();
    for(var i=0;i<dim;i++)
    {
        for(var j=0;j<dim;j++)
        {
            if(i==delete_i || j==delete_j)
            {
            }
            else{
                if(k>=dim_sub)
                {
                    l++;
                    sub_matrice[l]=new Array();
                    k=0;
                }

                sub_matrice[l][k]=matrice[i][j];
                k++;
            }
        }

    }
    return sub_matrice;

}

function det_matrice(matrice,dim)
{
    var determinant=0;
    var signe=1;
    var k=dim-1;

    if(dim==2)
    {

        return (matrice[0][0]*matrice[1][1]-matrice[0][1]*matrice[1][0]);

    }
    for(var i=0;i<dim;i++)
    {

        var mat=extract_submatrice(matrice,dim,0,i);
        determinant=determinant+signe*matrice[0][i]*det_matrice(mat,k);
        signe=-signe;
    }

    return determinant;

}
function inverse_matrice(matrice,dim)
{
    var com_matrice=new Array();
    var signe =1;
    var det_1 = 1/det_matrice(matrice,dim);
    for(var i=0;i<dim;i++)
    {
        for(j=0;j<dim;j++)
        {
            if(!com_matrice[i])com_matrice[i]=new Array();
            var matr=extract_submatrice(matrice,dim,i,j);
            com_matrice[i][j]=signe*det_1*det_matrice(extract_submatrice(matrice,dim,i,j),dim-1);
            signe=-signe;

        }
    }
    var inv_matrice = transp_matrice(com_matrice,dim,dim);
    return inv_matrice;

}

function multiplication_matricielle(matrice1,matrice2,dim1,dim2,dim3)
{
    var mult_matrice=new Array();
    for(var i=0;i<dim1;i++)
    {
        for(var j=0;j<dim2;j++)
        {
            if(!mult_matrice[i])mult_matrice[i]=new Array();
            mult_matrice[i][j]=0;
            for(var k=0;k<dim3;k++)
            {
                mult_matrice[i][j]=mult_matrice[i][j]+(matrice1[i][k]*matrice2[k][j]);

            }

        }
    }
    return mult_matrice;
}
function multi_vector_matrice(vector,matrice,dim2,dim3)
{
    var vector_result=new Array();

    for(var j=0;j<dim2;j++)
    {
        vector_result[j]=0;
        for(var k=0;k<vector.length;k++)
        {
            vector_result[j]=vector_result[j]+(vector[k]*matrice[k][j]);

        }

    }

    return vector_result;

}
function sum_ligne_matrice(matrice,dim1,dim2)
{
    var sum=new Array();
    for(var i=0;i<dim1;i++)
    {
        sum[i]=0;

        for(var j=0;j<dim2;j++)
        {
            sum[i]=sum[i]+matrice[i][j];

        }

    }
    return sum;

}
function transp_matrice(matrice,dim1,dim2) {
    var t_matrice = new Array();
    for (var i=0;i<dim1;i++)
    {
        t_matrice[i] = new Array();
        for (var j=0;j<dim2;j++)
        {
            t_matrice[i][j] = matrice[j][i];

        }
    }
    return t_matrice;
}

/*A la fin de l'algorithme il faut calculer la variation de c pour pouvoir le modifier afin qu'il converge vers le c réel*/
function calc_deltaC(jacobian_s,diagc,diff_conc,dim)
{
    var delta_c=0;
    var jacobian_invert= inverse_matrice(jacobian_s);
    var jacobian_diagc_invert =multi_matrice(jacobian_invert,diagc,3,3);
    var deltac= multiplication_matricielle(diff_conc,jacobian_diagc_invert,1,3,3);

    return delta_c;
    // matrice ayant comme diagonal les concentration des espèces, sa mulitplication avec le jacobian_star inverse et la différence entre X_total et X_tot_calc permet davoir le jacobian.
    // var diag_c_matrice=

}
function sum_vector(vector)
{
    var somme=0;
    for(var i=0;i<vector.length;i++)
    {
        somme=somme+vector[i];
    }
    return somme;
}

function NewtonRaphton_algorithme(Total_exact_concentration,Guess_concentration,list_component,list_species,list_beta_equilibre,model,iteration)
{
    iteration++;
    //console.log(iteration);

    var diff_accepte=0.00001;
    var matrice_conc_guess=row_to_matrice(Guess_concentration,list_species.length,list_component.length);
    //voir_matrice(matrice_conc_guess,list_species.length,list_component.length);
    var matrice_model_guess= puissance_matrice(matrice_conc_guess,model,list_species.length,list_component.length);
    //voir_matrice(matrice_model_guess,list_species.length,list_component.length);
    var row_component= matrice_to_row(matrice_model_guess,list_component.length,list_species.length);
    //voir_vecteur(row_component);
    var beta_row_concentration=multi_beta(row_component,list_component,list_beta_equilibre);
    //console.log(beta_row_concentration);
    //console.log("iteration avant delta c"+iteration+" :"+beta_row_concentration);
    //console.log(iteration);
    if(iteration==3000)return -1;

    var matrice_component_concentration=transp_matrice(row_to_matrice(beta_row_concentration,list_component.length,list_species.length),list_species.length,list_component.length);
    //console.log(matrice_component_concentration);
    var matrice_concentration_total= multi_matrice(model,matrice_component_concentration,list_species.length,list_component.length);
    //console.log(matrice_concentration_total);
    var Calculate_concentration_total= sum_ligne_matrice(matrice_concentration_total,list_species.length,list_component.length);
    //console.log(Calculate_concentration_total);
    var Delta_concentration = Substract_vector(Total_exact_concentration,Calculate_concentration_total);

    //console.log("les différences sont de "+(Math.abs(Delta_concentration[0])+Math.abs(Delta_concentration[1])+Math.abs(Delta_concentration[2]))+" !!!");
    //voir_vecteur(Delta_concentration);
    // à vérifier
    var boolean=0;
    for(var i=0;i<Delta_concentration.length;i++)
    {
        if(Math.abs(Delta_concentration[i])>diff_accepte)
        {
            boolean=1;
            break;
        }
    }
    if(boolean==1)
    {
        var jacobian_s=Jacobian_star(model,beta_row_concentration,list_species.length,list_component.length);
        //console.log(jacobian_s);
        var inverse_jacobian_star=inverse_matrice(jacobian_s,list_species.length);
        //console.log(inverse_jacobian_star);
        var diag_vector=new Array();
        for(var i=0;i<list_species.length;i++)
        {
            diag_vector[i]=Total_exact_concentration[i];

        }
        var matrice_diag_concentration= diag_matrice(diag_vector);
        //console.log(matrice_diag_concentration);
        var multi_jacobian_star_diag_concentration= multiplication_matricielle(matrice_diag_concentration,inverse_jacobian_star,list_species.length,list_species.length,list_species.length);

        var deltac=multi_vector_matrice(Delta_concentration,multi_jacobian_star_diag_concentration,list_species.length,list_species.length);

        for(var i=0;i<list_species.length;i++)
        {
            Guess_concentration[i]=Guess_concentration[i]+deltac[i];
        }
        //console.log("iteration"+iteration+"  Nouvelle concentrations"+Guess_concentration);
        for(var i=0;i<list_species.length;i++)
        {
            var k=0;
            //svoir_vecteur(Guess_concentration);
            while(Guess_concentration[i]>exact_conc[i] || Guess_concentration[i]<=0)
            {
                deltac[i]=0.5*deltac[i];
                Guess_concentration[i]=Guess_concentration[i]-1*deltac[i];
                k++;
                if(k==5600)return -1;
                //console.log("en dehors de la zone!! nouveau delta C "+i+"  :"+deltac[i]);

            }
        }
        return NewtonRaphton_algorithme(Total_exact_concentration,Guess_concentration,list_component,list_species,list_beta_equilibre,model,iteration);
    }
    else
    {
        console.log("fini");
        return beta_row_concentration;
    }
}


function creation_vecteur_species(vecteur_component,list_total_species)
{
    var vecteur_species=new Array();
    var k=0;
    for(var i=0;i<vecteur_component.length;i++)
    {

        for(var j=0;j<list_total_species.length;j++)
        {
            if(vecteur_component[i]==list_total_species[j])
            {
                vecteur_species[k]=vecteur_component[i];
                k++;
            }

        }

    }

    return vecteur_species;
}
function creation_model(vecteur_species,vecteur_component)
{
    var model= new Array();

    for(var i=0;i<vecteur_component.length;i++)
    {

        for(var j=0;j<vecteur_species.length;j++)
        {
            if(!model[i])model[i]=new Array();

            var p=0;
            for(var k=0;k<vecteur_component[i].length;k++)
            {

                if(vecteur_component[i].charAt(k)==vecteur_species[j].charAt(0))
                {
                    p=1;

                    if(vecteur_component[i].charAt(k+1))
                    {
                        if(Number(vecteur_component[i].charAt(k+1))<10 || Number(vecteur_component[i].charAt(k+1))>1)
                        {

                            p=p*Number(vecteur_component[i].charAt(k+1));
                        }
                    }}

            }

            model[i][j]=p;
        }


    }
    return transp_matrice(model,vecteur_species.length,vecteur_component.length);
}

function multi_beta(vecteur_conc,list_comp,list_beta)
{
    var multi_vec=new Array();
    for(var i=0;i<vecteur_conc.length;i++)
    {
        for(var j=0;j<list_beta.length;j++)
        {
            if(list_comp[i].length==1)
            {
                multi_vec[i]=vecteur_conc[i];
            }
            else
            {
                if(list_comp[i]==list_beta[j][0])
                {
                    multi_vec[i]=list_beta[j][1]*vecteur_conc[i];
                }

            }

        }
    }
    return multi_vec;
}
function Monte_Carlo_principle(Total_exact_concentration,list_component,list_species,list_beta_equilibre,model)
{
    var ant_delta=0;
    var vector_Guess_accept=new Array();
    var Guess_model_vector= new Array();
    var essai = 5000;
    // monte carlo randomisation
    for(var i=0;i<essai;i++)
    {

        for(var t=0;t<list_species.length;t++)
        {
            if(!Guess_model_vector[i])Guess_model_vector[i]=new Array();
            Guess_model_vector[i][t]=exact_conc[t]*Math.random();
        }



        var matrice_conc_guess=row_to_matrice(Guess_model_vector[i],list_species.length,list_component.length);
        //voir_matrice(matrice_conc_guess,list_species.length,list_component.length);
        var matrice_model_guess= puissance_matrice(matrice_conc_guess,model,list_species.length,list_component.length);
        //voir_matrice(matrice_model_guess,list_species.length,list_component.length);
        var row_component= matrice_to_row(matrice_model_guess,list_component.length,list_species.length);
        //voir_vecteur(row_component);
        var beta_row_concentration=multi_beta(row_component,list_component,list_beta_equilibre);
        var matrice_component_concentration=transp_matrice(row_to_matrice(beta_row_concentration,list_component.length,list_species.length),list_species.length,list_component.length);
        //console.log(matrice_component_concentration);
        var matrice_concentration_total= multi_matrice(model,matrice_component_concentration,list_species.length,list_component.length);
        //console.log(matrice_concentration_total);
        var Calculate_concentration_total= sum_ligne_matrice(matrice_concentration_total,list_species.length,list_component.length);
        //console.log(Calculate_concentration_total);
        var Delta_concentration = Substract_vector(Total_exact_concentration,Calculate_concentration_total);


        var summ_delta =0;
        for(var l=0;l<list_species.length;l++)
        {
            summ_delta=summ_delta+Math.abs(Delta_concentration[l]);
        }
        if(i==0)
        {
            vector_Guess_accept=Guess_model_vector[i];
            ant_delta=summ_delta;
        }

        else
        {
            if(summ_delta<ant_delta)
            {
                vector_Guess_accept=Guess_model_vector[i];
                ant_delta=summ_delta;
                //console.log("delta neutre :"+Delta_concentration);
            }
        }

    }
    return vector_Guess_accept;
}


function algo_spider_web(Total_exact_concentration,vector_Guess_accept,list_component,list_species,list_beta_equilibre,model,diff_accepte)
{
    var matrice_conc_guess=row_to_matrice(vector_Guess_accept,list_species.length,list_component.length);
    var matrice_model_guess= puissance_matrice(matrice_conc_guess,model,list_species.length,list_component.length);
    var row_component= matrice_to_row(matrice_model_guess,list_component.length,list_species.length);
    var beta_row_concentration=multi_beta(row_component,list_component,list_beta_equilibre);
    var matrice_component_concentration=transp_matrice(row_to_matrice(beta_row_concentration,list_component.length,list_species.length),list_species.length,list_component.length);
    var matrice_concentration_total= multi_matrice(model,matrice_component_concentration,list_species.length,list_component.length);
    var Calculate_concentration_total= sum_ligne_matrice(matrice_concentration_total,list_species.length,list_component.length);
    var Delta_concentration = Substract_vector(Total_exact_concentration,Calculate_concentration_total);
    var ant_delta=0;
    for(var i=0;i<Delta_concentration.length;i++)
    {
        ant_delta=ant_delta+Math.abs(Delta_concentration[i]);
    }
    var delta_C=new Array();
    for(var i=0;i<list_species.length;i++)
    {
        delta_C[i]=Total_exact_concentration[i]/20000;
    }

    //console.log("vecteur choisi pour la deuxième partie : "+vector_Guess_accept);
    //console.log("dernière différence entre calc et réel "+ant_delta);
    for(var t =0;t<1500;t++)
    {
        for(var i=0;i<list_species.length;i++)
        {
            var guess_plus = new Array();
            var guess_moins = new Array();
            for(var u =0;u<list_species.length;u++)
            {
                guess_plus[u]=vector_Guess_accept[u];
                guess_moins[u]=vector_Guess_accept[u];
            }
            guess_plus[i]=guess_plus[i]+delta_C[i];
            guess_moins[i]=guess_moins[i]-delta_C[i];
            //console.log("Guess + = "+guess_plus);
            //console.log("Guess - = "+ guess_moins);
            var matrice_conc_guess1=row_to_matrice(guess_plus,list_species.length,list_component.length);
            var matrice_conc_guess2=row_to_matrice(guess_moins,list_species.length,list_component.length);
            var matrice_model_guess1= puissance_matrice(matrice_conc_guess1,model,list_species.length,list_component.length);
            var matrice_model_guess2= puissance_matrice(matrice_conc_guess2,model,list_species.length,list_component.length);
            var row_component1= matrice_to_row(matrice_model_guess1,list_component.length,list_species.length);
            var row_component2= matrice_to_row(matrice_model_guess2,list_component.length,list_species.length);
            var beta_row_concentration1=multi_beta(row_component1,list_component,list_beta_equilibre);
            var beta_row_concentration2=multi_beta(row_component2,list_component,list_beta_equilibre);
            var matrice_component_concentration1=transp_matrice(row_to_matrice(beta_row_concentration1,list_component.length,list_species.length),list_species.length,list_component.length);
            var matrice_component_concentration2=transp_matrice(row_to_matrice(beta_row_concentration2,list_component.length,list_species.length),list_species.length,list_component.length);
            var matrice_concentration_total1= multi_matrice(model,matrice_component_concentration1,list_species.length,list_component.length);
            var matrice_concentration_total2= multi_matrice(model,matrice_component_concentration2,list_species.length,list_component.length);
            var Calculate_concentration_total1= sum_ligne_matrice(matrice_concentration_total1,list_species.length,list_component.length);
            var Calculate_concentration_total2= sum_ligne_matrice(matrice_concentration_total2,list_species.length,list_component.length);
            var Delta_concentration1 = Substract_vector(Total_exact_concentration,Calculate_concentration_total1);
            var Delta_concentration2 = Substract_vector(Total_exact_concentration,Calculate_concentration_total2);
            /*console.log("beta row +  "+beta_row_concentration1);
             console.log("concentration exact + ="+Calculate_concentration_total1);
             console.log("Delta concentration +   "+Delta_concentration1);
             console.log("beta row +  "+beta_row_concentration2);
             console.log("concentration exact + ="+Calculate_concentration_total2);
             console.log("Delta concentration +   "+Delta_concentration2);*/
            var summ_delta1 =0;
            var summ_delta2=0;

            for(var l=0;l<Delta_concentration1.length;l++)
            {
                summ_delta1=summ_delta1+Math.abs(Delta_concentration1[l]);
                summ_delta2=summ_delta2+Math.abs(Delta_concentration2[l]);

            }


            if(summ_delta1<ant_delta)
            {

                vector_Guess_accept[i]=guess_plus[i];
                //console.log("nouveau vecteur optimal : "+vector_Guess_accept);
                //console.log("Delta concentration  ="+Delta_concentration1);
                ant_delta=summ_delta1;
                var boolean=0;
                for(var z=0;z<list_species.length;z++)
                {
                    if(Math.abs(Delta_concentration1[z])>diff_accepte)boolean=1;
                }
                if(boolean==0)
                {
                    return beta_row_concentration1;
                }

            }
            if(summ_delta2<ant_delta)
            {

                vector_Guess_accept[i]=guess_moins[i];
                ant_delta=summ_delta2;
                //console.log("nouveau vecteur optimal : "+vector_Guess_accept);
                //console.log("Delta concentration  ="+Delta_concentration2);
                var boolean=0;
                for(var z=0;z<list_species.length;z++)
                {
                    if(Math.abs(Delta_concentration2[z])>diff_accepte)boolean=1;
                }
                if(boolean==0)
                {
                    return beta_row_concentration2;
                }

            }
        }
    }
    return -1;
}

//essai des fonctions
//console.log(Math.pow(0,3));

var exact_conc=[1.0,0.55,0.8];
var list_comp=["X","Y","Z","XY","XY2","XYZ","YZ"];
var list_total=["A","B","C","D","E","F","G","H","I","J","K","L","M","X","Y","Z","O","P","Q","R"];
var list_beta_component=[["XY",400],["XY2",0.4],["XYZ",41],["YZ",0.04]];
var list_species= creation_vecteur_species(list_comp,list_total);

var model=creation_model(list_species,list_comp);
//console.log(model);
var row;
var monte_carlo=new Array();
var summ=-1;
var i=0;
var summ2=-1;

while(summ2==-1)
{
    i++
    monte_carlo=Monte_Carlo_principle(exact_conc,list_comp,list_species,list_beta_component,model);

    summ2 =algo_spider_web(exact_conc,monte_carlo,list_comp,list_species,list_beta_component,model,0.01);

    console.log(i);

}
console.log(summ2);
/*
 for(var i=0;i<1;i++)
 {

 do{
 var boolean=0;
 summ2=algo_spider_web(exact_conc,summ,list_comp,list_species,list_beta_component,model,0.00001);
 if(summ2==-1)
 {
 console.log(summ);
 summ2=Monte_Carlo_principle(exact_conc,list_comp,list_species,list_beta_component,model);
 boolean=1;
 }
 }while(boolean==1);
 console.log(summ2);

 }

 var i=0;
 while(i<1)
 {
 monte_carlo=Monte_Carlo_principle(exact_conc,list_comp,list_species,list_beta_component,model);

 summ=NewtonRaphton_algorithme(exact_conc,monte_carlo,list_comp,list_species,list_beta_component,model,0);
 if(summ!=-1)i++;

 }
 console.log(summ);*/