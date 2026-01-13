import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../../services/product-service';
import {Product} from '../../../interfacess/product';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-update-product',
  standalone: false,
  templateUrl: './update-product.html',
  styleUrl: './update-product.css',
})
export class UpdateProduct implements OnInit{
  myFormUpdateProduct!: FormGroup;
  productId!: string;
  constructor(private formBuilder: FormBuilder,
              private productService: ProductService,
              private router: Router,
              private route: ActivatedRoute
  ) {
  }
  ngOnInit(): void {
    this.initMyFormUpdateProduct();
    this.productId = this.route.snapshot.paramMap.get('id')!;
    console.log(this.productId);
  }
  getProductById(id:string){
    this.productService.getProductById(id).subscribe({
      next: data => {
        console.log("Product to update => ",data);
        this.affectProductToForm(data);
      },
      error: err => {
        console.log(err);
      }
    })
  }
  private initMyFormUpdateProduct(){
    this.myFormUpdateProduct = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
    })
  }
  private affectProductToForm(product:Product){
    this.myFormUpdateProduct.patchValue({
      name: product.name,
      price: product.price,
      quantity: product.quantity
    })
  }
  onUpdateProduct() {
    if (this.myFormUpdateProduct.invalid) {
      console.log("Le formulaire est invalide !");
      return;
    }
    // Récupérer les valeurs du formulaire
    const updatedProduct: Product = {
      name: this.myFormUpdateProduct.value.name,
      price: this.myFormUpdateProduct.value.price,
      quantity: this.myFormUpdateProduct.value.quantity
    };
    // Appeler le service pour mettre à jour le produit
    this.productService.updateProduct(this.productId, updatedProduct).subscribe({
      next: (response) => {
        console.log("Produit mis à jour avec succès :", response);
        this.router.navigate(['/products']);
      },
      error: (err) => {
        console.error("Erreur lors de la mise à jour du produit :", err);
      }
    });
  }
}
