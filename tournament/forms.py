__author__ = 'rafael'
from django import forms
#
class UploadFileForm(forms.Form):
    fileUpload = forms.FileField()