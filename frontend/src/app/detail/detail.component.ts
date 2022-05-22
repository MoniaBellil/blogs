import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { blogService } from '../service/blog.service';
import { ActivatedRoute } from '@angular/router';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  blogForm: FormGroup;
  blogId: string;
  imageSrc: any;
  profileImgToUpload: File;

  constructor(
    private cd: ChangeDetectorRef,
    private toastr: ToastrService,
    private location: Location,
    private route: ActivatedRoute,
    private blogService: blogService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.blogForm = this.fb.group({
      author: [null, Validators.required],
      title: [null, Validators.required],
      content: [null, Validators.required],
      profileImg: [null]
    });
    this.blogId = this.route.snapshot.params.id;
    this.getblog();
  }

  editblog() {
    if (this.blogForm.valid) {

      const formData = new FormData();
      formData.append('author', this.blogForm.value.author);
      formData.append('title', this.blogForm.value.title);
      formData.append('content', this.blogForm.value.content);
      if (this.profileImgToUpload) {
        formData.append('profileImg', this.profileImgToUpload);
      }

      this.blogService.editblog(this.blogId, formData).subscribe(result => {
        if (result.status) {
          this.toastr.success(result.msg);
          this.location.back();
        } else {
          this.toastr.error(result.msg);
        }
      });
    } else {
      this.toastr.error('Fill all the required fields');
      return false;
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.blogForm.controls[controlName].hasError(errorName);
  }

  getblog() {
    this.blogService.getblog(this.blogId).subscribe(result => {
      if (result.status) {
        this.blogForm.patchValue({
          author: result.data.author,
          title: result.data.title,
          content: result.data.content,
          phoneNumber: result.data.phoneNumber,
          profileImg: result.data.profileImg
        });
        if (result.data.profileImg) {
          this.imageSrc = result.data.profileImg;
        }
      } else {
      }
    });

  }

  dropped(files: NgxFileDropEntry[]) {
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          const fileImage = file.name.split('.');
          const fileExt = fileImage[fileImage.length - 1];
          const fileType = file.type;
          const size = file.size;
          if (fileType.includes('image')) {
            if ('|jpg|png|jpeg|'.indexOf(fileExt) === -1) {
              this.imageSrc = '../../../../assets/img/blog_profile.png';
              this.toastr.error('IMAGE_FORMAT_NOT_SUPPORTED');
              return false;
            } else if (size >= 20185920) { // 20mb
              this.imageSrc = '../../../../assets/img/blog_profile.png';
              this.toastr.error('IMAGE_SIZE_EXCEED');
              return false;
            } else {
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = () => {
                this.imageSrc = reader.result;
              };
              this.profileImgToUpload = file;
              return true;
            }
          } else {
            this.imageSrc = '../../../../assets/img/blog_profile.png';
            this.toastr.error('FILE_FORMAT_NOT_SUPPORTED');
          }
        });
      } else {
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
      }
    }
  }
  
  fileOver(event) {
    // Gets called after a file-drop.
  }

  fileLeave(event) {
    // Gets called when you leave a file-drop.
  }
}
