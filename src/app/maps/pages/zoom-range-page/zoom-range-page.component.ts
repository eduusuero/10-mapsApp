import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LngLat, Map } from 'mapbox-gl';

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrls: ['./zoom-range-page.component.css']
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy{



  public zoom: number = 10;
  public map?: Map;
  public lngLat: LngLat = new LngLat(-67, -38.5);

  @ViewChild('map') divMap?: ElementRef;

  ngOnDestroy(): void {
    this.map?.remove();
  }
  ngAfterViewInit(): void {

    if ( !this.divMap ) throw 'El elemento HTML no fue encontrado'

    this.map = new Map({
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });

    this.mapListeners();
  }

  mapListeners(){

    if ( !this.map ) throw 'Mapa no inicializado'

    this.map.on('zoom', (ev) => {
      this.zoom = this.map!.getZoom();
    })

    this.map.on('zoomend', (ev) => {
      if( this.map!.getZoom() < 18) return; //Si es menor a 18 el zoom no hago nada.

      this.map?.zoomTo(18); //Si es mayor a 18 seteo el zoom en 18.
    })

    this.map.on('move', () => {

      this.lngLat = this.map!.getCenter();

      const { lng, lat } = this.lngLat;
    })

  }

  masZoom(){
    this.map?.zoomIn();
  }
  menosZoom(){
    this.map?.zoomOut();
  }

  zoomChanged( value: string ){

    this.zoom = Number ( value );

    this.map?.zoomTo(this.zoom)
  }


}
