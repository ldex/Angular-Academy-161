import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../product.interface';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  @Input() product: Product;

  constructor(
    private activatedRoute:ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    if(id) {
      this
        .productService
        .products$
        .pipe(
          map(products => products.find(p => p.id == id))
        )
        .subscribe(
          product => this.product = product
        )
    }
  }

}
