from django import forms

from reviews.models import SkateReview

class SkateReviewForm(forms.ModelForm):
    class Meta:
        model = SkateReview
        fields = ('user', 'skateboard', 'rating')

    def clean_rating(self):
        rating = self.cleaned_data.get('rating')
        if rating < 1.00 or rating > 5.00:
            raise forms.ValidationError('Рейтинг должен быть от 1.00 до 5.00')
        return rating