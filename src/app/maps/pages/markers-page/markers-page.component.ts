import { Component, ElementRef, ViewChild } from '@angular/core';
import { Map, LngLat, Marker } from 'mapbox-gl';

interface MarkerAndColor {
  color: string;
  marker: Marker;
}

interface PlainMarker {
  color: string;
  lngLat: number[];
}

@Component({
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css']
})
export class MarkersPageComponent {

  public markers: MarkerAndColor[] = [];

  public map?: Map;
  public lngLat: LngLat = new LngLat(-67.807194, -38.981820);

  public lngLatMarker: LngLat = new LngLat(0,0);

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
      zoom: 13,
    });

    this.readFromLocalStorage();

    //const markerHtml = document.createElement('div');
    //markerHtml.innerHTML = 'Eduu Suero'

    //const marker = new Marker({
      //color: 'red'
    //  element: markerHtml
    //})
    //.setLngLat( this.lngLat )
    //.addTo( this.map )

  }

  createMarker(){
    if( !this.map ) return;

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const longitudLatitud = this.map.getCenter();

    this.addMarker(longitudLatitud , color );

  }

  addMarker( lngLat: LngLat, color: string  ){
    if( !this.map ) return;

    const marker = new Marker({
      color: color,
      draggable: true,
    })
    .setLngLat( lngLat )
    .addTo( this.map );

    this.markers.push({
      color: color,
      marker: marker,
    });

    this.saveToLocalStorage();

    marker.on('dragend', () => this.saveToLocalStorage());
  }

  deleteMarker(i: number ){
    this.markers[i].marker.remove();
    this.markers.splice(i,1);
  }

  flyTo( marker: Marker ){
    this.map?.flyTo({
      zoom: 14,
      center: marker.getLngLat(),
    })

  }

  saveToLocalStorage() {
    const plainMarkers: PlainMarker[] = this.markers.map( ({ color, marker }) => {
      return {
        color,
        lngLat: marker.getLngLat().toArray()
      }
    });

    localStorage.setItem('plainMarkers', JSON.stringify( plainMarkers ));

  }

  readFromLocalStorage() {
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarkers: PlainMarker[] = JSON.parse( plainMarkersString ); //! OJO!

    if (!Array.isArray(plainMarkers)) {
      console.error('Error: plainMarkers no es un arreglo', plainMarkers);
      return;
    }

    plainMarkers.forEach( ({ color, lngLat }) => {
      const [ lng, lat ] = lngLat;
      const coords = new LngLat( lng, lat );

      this.addMarker( coords, color );
    })
  }

}
