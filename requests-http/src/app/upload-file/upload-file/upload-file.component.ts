import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { filterResponse, uploadProgress } from 'src/app/shared/rxjs-operators';
import { environment } from 'src/environments/environment';
import { UploadFileService } from './upload-file.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent implements OnInit {

  files: Set<File> = new Set();
  progress = 0;

  constructor(private uploadFileService: UploadFileService) {}

  ngOnInit(): void {}

  onChange(event: any) {
    console.log(event);
    this.files = new Set();

    const selectedFiles = <FileList>event.srcElement.files;

    const fileNames = [];
    for (let i = 0; i < selectedFiles.length; i++) {
      fileNames.push(selectedFiles[i].name);
      this.files.add(selectedFiles[i]);
    }

    document.getElementById('formFile')!.innerHTML = fileNames.join(', ');

    this.progress = 0;

  }

  onUpload() {
    if(this.files && this.files.size > 0) {
      this.uploadFileService.upload(this.files, environment.BASE_URL + '/upload')
      .pipe(
        uploadProgress(progress => {
          console.log(progress)
          this.progress = progress;
        }),
        filterResponse()
      )
      .subscribe(response => console.log('Upload concluido: ', response))
      // .subscribe((event: HttpEvent<Object>) => {
      //   if(event.type === HttpEventType.Response) {
      //     console.log('Upload concluído');
      //   } else if (event.type === HttpEventType.UploadProgress) {
      //     const percentDone = Math.round((event.loaded * 100)/ event.total!);
      //     this.progress = percentDone;
      //     console.log('Progresso:', percentDone)
      //   }
      // })
    }
  }
}
